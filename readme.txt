<script type="text/javascript">
$(document).ready(function(){
	$("#micePage").mice_pageBox({
		rootCss : 'micePage',		// ��css������ͬcss��ʽ��ϵ������
		url : '<%=basePath%>rzht_news/ptNewsList',	// ��תurl
		currentPage : <%=p.getCurrentPage()%>,		// ��ǰҳ��
		pageSize : 10,			// ҳ����ʾ����
		viewPageNum : 10,
		totalPage : <%=p.getTotalPage()%>			// ��ҳ��
	});
});
</script>


	<div id = "micePage">
		
	</div>