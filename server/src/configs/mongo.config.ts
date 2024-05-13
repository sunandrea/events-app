import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  console.log(`connected...`);
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService) =>
  configService.get('MONGO_URI') as string;
