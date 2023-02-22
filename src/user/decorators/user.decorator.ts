import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    /*
     Tại sao getRequest() không cần thêm datatype là ExpressRequest mà trong cái request vẫn có property request.user
     * Created by: MARC 18.02.2023 17:43:32
     */

    if (!request.user) {
        return null;
    }

    if (data) {
        return request.user[data];
    }

    return request.user;
});
