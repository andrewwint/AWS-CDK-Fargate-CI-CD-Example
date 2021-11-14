import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import { FargateConstruct } from '@awint/fargate'
import { BitbucketCodeBuild } from '@awint/bitbucket-codebuild-cdk-construct/lib/index'
export class NestjsCloudStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Name for container, subdomain, and imagedefinitions.json no spaces or special chars
    const appName = 'NestJsApp'

    //Taraget Hosting Services
    const fargate = new FargateConstruct(this, "NestJsFargate", {
      desiredCount: 1,
      containerPort: 3000,
      subDomainName: appName.toLowerCase(),
      containerName: appName
    })

    //Build and Test 
    const build = new BitbucketCodeBuild(this, "NestJsCodeBuild", {
      appName: appName,
      owner: 'awintbit',
      repo: 'aws-constructs',
      branchOrRef: 'master',
      buildSpecFromSourceFilename: 'example-apps/nestjs-cloud/app/buildspec.yml',
      environmentVariables: {
        APP_ENV: { value: 'production' },
        VER: { value: "1.2.3" },
        REPOSITORY_URI: { value: fargate.ecrRepository.repositoryUri }
      },
      webhookFilters: [
        codebuild.FilterGroup
          .inEventOf(codebuild.EventAction.PUSH)
          .andCommitMessageIs('\\[NESTBuild\\]')
      ]
    })

    //Create Deploy Pipeline 
    const pipeline = new codepipeline.Pipeline(this, 'MyPipeline');
    const sourceOutput = new codepipeline.Artifact();

    //Add Stage 1 : Source - s3 trigger
    const sourceAction = new codepipeline_actions.S3SourceAction({
      actionName: 'S3Source',
      bucket: build.bucket,
      bucketKey: `${appName.toLowerCase()}/artifact`,
      output: sourceOutput,
    });
    pipeline.addStage({
      stageName: 'Source',
      actions: [sourceAction],
    });

    //Add Stage 2 : Deploy - ECR update Service(s)
    const deployAction = new codepipeline_actions.EcsDeployAction({
      actionName: 'ECSDeploy',
      service: fargate.albFargateService.service,
      imageFile: sourceOutput.atPath('imagedefinitions.json')
    })
    pipeline.addStage({
      stageName: 'Deploy',
      actions: [deployAction],
    });

  }
}
