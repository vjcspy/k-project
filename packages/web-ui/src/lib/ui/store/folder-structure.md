#### Tại sao lại chọn cách define folder structure theo type chứ không theo page?

Như lúc trước trong folder store sẽ tạo ra các folder đi theo các page hoặc section, ví dụ sẽ tạo 1 thư  mục App và trong có
các file như:  app.state, app.store, app.service và 1 file index để export tất cả ra ngoài.

Cách dùng này có vẻ OK cho đến khi có 1 section khác depend vào service của app, trong app lại depend vào action của
module đó. Bởi vì 2 phần này import nhau qua file index nên dẫn đến circle dependencies.

Nếu chúng ta chọn cách tổ chức mới là theo type: actions, middleware, services.... Có nhược điểm là phải vào từng type để check từng section
và phải tạo duplicate các section trong từng type

=>  Giải pháp là sẽ tạo 1 file store, service, middleware,... ở ngoài và export từng thằng ra
