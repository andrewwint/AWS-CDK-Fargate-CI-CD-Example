import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'
import * as my_company_core from '@awint/core/lib/core';

export class Ec2InstanceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const core = new my_company_core.CoreConstruct(this, "MyCoCores")
    const vpc = ec2.Vpc.fromLookup(this, 'MyCoVpc', { vpcId: core.vpc }) //using and exiting vpc

    const instance = new ec2.Instance(this, 'Instance', {
      vpc,
      machineImage: new ec2.GenericLinuxImage({ 'us-east-1': 'ami-00ddb0e5626798373' }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      keyName: 'test-development',
    });

    const eip = new ec2.CfnEIP(this, "Ip");

    const association = new ec2.CfnEIPAssociation(this, "Ec2Association", {
      eip: eip.ref,
      instanceId: instance.instanceId
    })

    new cdk.CfnOutput(this, 'InstanceID', {
      value: <string>instance.instanceId
    })

    new cdk.CfnOutput(this, 'ElasticIP', {
      value: <string>association.eip
    })


  }
}
