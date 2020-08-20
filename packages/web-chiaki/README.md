# web-chiaki

- Only theming component


# Known Issues:

- Do tất cả các component mình đều sử dụng dynamic load nên sẽ include những thư viện bên vào file chunk,
để không bị làm tăng kích thước của component, chỉ nên sử dụng lại props truyền vào, không viết các function xử
lý cần import module khác vào component.  Ngoài ra việc sử dụng lại props làm cho component trở nên trong sáng hơn rất nhiều,
thuận  lợi cho việc test và làm UI sau này.(Dumb component)

