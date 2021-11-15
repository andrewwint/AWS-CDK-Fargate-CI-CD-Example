import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ` <h1>Nest.js App and AWS CDK -> CloudFormation </h1>
    <ul>
      <ol> &#9745; Dockerized Nest App </ol>
      <ol> &#9745; AWS CDK  CloudFoundation -  </ol>
      <ol> &#9745; Fargate Service  </ol>
      <ol> &#9745; Subdomain Auto  </ol>
      <ol> &#9745; CodeBuild Setup </ol>
      <ol> &#9745; CodeBuild Trigger user commit message [NESTBuild] </ol>
      <ol> &#9745; CodeBuild S3 Artifact </ol>
      <ol> &#9745; Pipeline Configuration : 2 stage deploy pipeline</ol>
      <ol> &#9745; Pipeline Source </ol>
      <ol> &#9745; Pipeline ECS Deploy </ol>
      <ol> &#9745; Run initial Pipeline  </ol>
      <ol> &#9745; Subdomain Auto </ol>
      <ol> &#9744; EFS inststance </ol>
      <ol> &#9744; EFS mount point </ol>
      <ol> &#9744; EFS bind </ol>
      <ol> &#9744; Static Website hosting </ol>
    </ul>`;
  }
}
