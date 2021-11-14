import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'

export class VpcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'MyCoDefaultVpc', { maxAzs: 3, natGateways: 1 });

    new cdk.CfnOutput(this, 'Output', {
      value: <string>vpc.vpcId
    })
    // The code that defines your stack goes here
  }
}
