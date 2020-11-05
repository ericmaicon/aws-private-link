module.exports = (resource) => {
  if (resource.Type === 'AWS::ApiGateway::Method') {
    return { destination: 'API' };
  }

  if (resource.Type === 'AWS::Logs::LogGroup') {
    return { destination: 'Logs' };
  }

  if (resource.Type === 'AWS::EC2::Instance') {
    return { destination: 'BigResources' };
  }

  if (resource.Type === 'AWS::CodeBuild::Project') {
    return { destination: 'BigResources' };
  }

  if (resource.Type.includes('CodePipeline')) {
    return { destination: 'BigResources' };
  }

  if (resource.Type.includes('Route53')) {
    return { destination: 'DomainRoutes' };
  }

  if (resource.Type.includes('RDS')) {
    return { destination: 'BigResources' };
  }

  if (resource.Type.includes('SQS')) {
    return { destination: 'BigResources' };
  }

  if (resource.Type.includes('SNS')) {
    return { destination: 'BigResources' };
  }

  if (resource.Type.includes('ElastiCache')) {
    return { destination: 'BigResources' };
  }

  if (resource.Type === 'AWS::CertificateManager::Certificate') {
    return { destination: 'BigResources' };
  }

  if (resource.Type === 'AWS::IAM::Role') {
    return { destination: 'Roles' };
  }

  // Falls back to default
};
