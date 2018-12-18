import { createContext } from '../../src'

const simpleFunctionScript = async () => {
  const context = await createContext({
    cwd: __dirname
  })
  const AwsProvider = await context.import('AwsProvider')
  const AwsProviderInputs = {
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx'
    }
  }
  const awsProvider = context.construct(AwsProvider, AwsProviderInputs, context)

  const AwsLambdaCompute = await context.import('AwsLambdaCompute')
  const AwsLambdaComputeInputs = {
    provider: awsProvider,
    memory: 512,
    runtime: 'nodejs'
  }
  const awsLambdaCompute = context.construct(AwsLambdaCompute, AwsLambdaComputeInputs, context)

  const Function = await context.import('Function')
  const FunctionInputs = {
    compute: {
      aws: awsLambdaCompute
    },
    name: 'demoing-type-system',
    memory: 512,
    timeout: 10,
    runtime: 'nodejs',
    code: './SimpleFunction',
    handler: 'index.hello'
  }
  const fn = context.construct(Function, FunctionInputs, context)

  await fn.deploy(context)
}

// const SimpleServiceScript = async () => {
//   const context = await createContext({
//     cwd: __dirname
// })
//
//   const SimpleService = await context.import('./SimpleService')
//   const simpleService = context.construct(SimpleService, {}, context)
//
//   simpleService.deploy(context)
// }

// eslint-disable-next-line no-console
simpleFunctionScript().catch((e) => console.log(e))
