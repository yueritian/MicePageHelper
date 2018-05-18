# MicePageHelper

## 插件初始化
```javascript
<script type="text/javascript">
    $(document).ready(function(){
        $("#micePage").mice_pageBox({
		    rootCss : 'micePage',                       // 根css，负责不同css样式套系的区分
		    url : '<%=basePath%>rzht_news/ptNewsList',  // 跳转url
		    currentPage : <%=p.getCurrentPage()%>,      // 当前页数
		    pageSize : 10,                              // 页面显示条数
		    totalPage : <%=p.getTotalPage()%>           // 总页数
	    });
    });
</script>
```
## 对应页面元素
```html
<div id = "micePage"></div>
```
