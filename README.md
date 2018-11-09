1) node modules in git ignore so use npm i
2) to run project type npm run start-dev(starts both react end node servers)
3) As for db I m using mlab, so I m not sure how to properly back up it. But you can use my mlab profile(login:fogit, password:0025557l). And to access db go to images(user:god, password:blessrng7)
4)I dont have time to validate form input, but it should check if it is not emty and it has .png .jpg or .jpeg extentions

Распишу по пунктам что и как сделал после получения фидбека:
1) По поводу разделения логики, создал паочку контроллер, в ней разместил ункцию скаживания, колбэк к сожалению отдельно разместить не удалось из-за непонятной мне ошибки. Его оставил в общем файле.

2)Да действительно под валидацией имелось в виду что я ничего не проверяю. Потому в этот раз я добавил несколько проверок:
  - обычный require для инпута чтобы нельзя было отправить пустую строку
  - проверка на 3 расширения картинок
  - проверка на наличие картинки дупликата
  - оповещения если проверка провалится, а так же если скачивание будет успешным
  
3)Со сжатием вышел казус) Я не нашел каких либо функций шарпа на него потому и решил что ресайз решает все проблемы. На этот раз использую .jpeg({quality: 50}), надеюсь все таки это то что нужно, ужимаю в зависимости от формата

Ну а база даных остается прежней
