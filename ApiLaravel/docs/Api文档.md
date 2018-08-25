# Api文档（简介）
## base：`http://hostname/api/`

|  方法  | Api | 功能 | 请求参数 |
|:-:|:-|:-|:-|
|`POST`|`/users`|用户登录验证|`name` `password`|
|`GET`|`/ques`|获取所有问卷的所有信息||
|`POST`|`/ques/create`|创建一个问卷|`title` `description` `email` `emailTitle` `isntReply`|
|`GET`|`ques/{id}`|获取编号为id的问卷的全部信息|`id`|
|`POST`|`ques/{id}/createshort`|为编号为id的问卷创建一个简答题|`id` `type` `title`|
|`POST`|`ques/{id}/createmany`|为编号为id的问卷创建一个选择题|`id` `type` `title` `optscontent[]`|
|`POST`|`ques/{id}status`|更新编号为id的问卷的发布状态|`id` `status`|
|`GET`|`ques/{id}/delete`|删除编号为id的问|`id`|
|`POST`|`ques/{id}/answers`|为编号为id的问卷创建一个回答|`id` `replypojo`|
|`GET`|`ques/{id}/answers`|获取编号为id的问卷的所有完整回答|`id`|