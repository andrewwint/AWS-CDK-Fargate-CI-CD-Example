#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Ec2InstanceStack } from '../lib/ec2-instance-stack';

const app = new cdk.App();
const REGION = { account: '123345890-FAKE', region: 'us-east-1' }
new Ec2InstanceStack(app, 'Ec2InstanceStack', { env: REGION });
