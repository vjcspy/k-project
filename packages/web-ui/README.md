# web-ui

Web UI depended on NextJs and React also

## Note

 - Sử dụng [https://graphql-code-generator.com/](https://graphql-code-generator.com/). Do đó sau này có thể  magento core update thêm Graphql query thì phải generate lại
```bash
yarn web-ui codegen
```
Trước khi generate:
 - Copy 2 folder `queries` và `fragments` của @magento/venia-ui vào để đảm bảo mọi thứ mới nhất.
 - Check lại schema trong file `codegen.yml`


