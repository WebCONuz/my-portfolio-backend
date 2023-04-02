import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMsgDto } from './create-user_msg.dto';

export class UpdateUserMsgDto extends PartialType(CreateUserMsgDto) {}
