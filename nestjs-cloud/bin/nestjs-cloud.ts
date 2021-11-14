#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NestjsCloudStack } from '../lib/nestjs-cloud-stack';

const REGION = { account: '790768631355', region: 'us-east-1' }
const app = new cdk.App();
new NestjsCloudStack(app, 'NestjsCloudStack', {env: REGION });
