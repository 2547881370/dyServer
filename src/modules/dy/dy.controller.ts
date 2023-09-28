import {
  Controller,
  Get,
  Param

} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';


@Controller('file')
export class DyController {

  @Get('/getMessage/:text')
  async getMessage(@Param() { text }) {
    console.log(text,'输入信息')
    return {
      status : 200,
      text : text
    };
  }
}
