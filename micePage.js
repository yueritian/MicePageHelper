
/**
 * jquery分页插件
 * 
 * author:chenph
 * date:2015/12/5 
 */
(function($) {
	// 翻页插件
	$.fn.mice_pageBox = function(options) {
		// 默认值
		var defaults = { 
			rootCss : 'micePage',				// 根css，负责不同css样式套系的区分
			url : '',							// 跳转url
			viewPageNum : 10,					// 默认显示页数
			pageNoParamName : 'currentPage',	// 当前页面对应参数名
			pageSizeParamName : 'pageSize',	// 页面显示条数对应参数名
			currentPage : 1,					// 当前页数
			pageSize : 10,						// 页面显示条数
			totalPage : 4,						// 总页数
			params:{},							// 参数列表
			overPageFunc:function(){		// 自定义页码范围验证
				alert('页码不能超过最大页数');
			},
			underPageFunc:function(){		// 自定义页码范围验证
				alert('页码不能小于最小页数');
			},
			inputValidationFunc:function(){		// 自定义输入跳转页面页数范围非数字提示
				alert("页码只能是数字!");  
			}
		}; 
		var opts = jQuery.extend(defaults, options);
		// 获取元素id
		var thisID = $(this).attr("id");
		// 将按钮加入到想要操作的元素后边
		var pageBox = "";
			pageBox = pageBox+'<div id="'+thisID+'_micePageBox" class="'+opts.rootCss+'">';
			// 拼装表单
			pageBox = pageBox+'<form id="'+thisID+'_micePageForm" action="'+opts.url+'" method="post">';
			pageBox = pageBox+'<input type="hidden" name="'+opts.pageNoParamName+'" value="'+opts.currentPage+'" id="'+thisID+'_micePageFormCurrentPage"/>';
			pageBox = pageBox+'<input type="hidden" name="'+opts.pageSizeParamName+'" value="'+opts.pageSize+'"/>';
			// 遍历翻页参数
			for(var key in opts.params){
				pageBox = pageBox+'<input type="hidden" name="'+key+'" value="'+opts.params[key]+'"/>'; 
			}  
			pageBox = pageBox+'</form>';
			pageBox = pageBox+' <div class="pageBox">';
			pageBox = pageBox+'	 <input type="button" class="shouYe" value="首页" onclick="MicePage_toPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\',1,'+opts.totalPage+','+opts.overPageFunc+','+opts.underPageFunc+', 0)"/>';
			pageBox = pageBox+'	 <ul>';
			pageBox = pageBox+'		<li> <a onclick="MicePage_toPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\','+(opts.currentPage-1)+','+opts.totalPage+','+opts.overPageFunc+','+opts.underPageFunc+', 0)"> < </a></li>';
			// 计算翻页条起始最小值
			var min = 0;
			if(opts.currentPage == 1){
				min = 0;
			}else if(opts.currentPage == opts.totalPage){
				min = opts.totalPage - opts.viewPageNum;
			}else{
				min = parseInt((opts.currentPage - 1) / opts.viewPageNum) * opts.viewPageNum;
			}
			// 防止越界
			if(min < 0){
				min = 0;
			}
			// 计算翻页条起始最大值
			var max = min + opts.viewPageNum;
			// 若最大显示条数大于总页数，则使用总页数
			if(max > opts.totalPage){
				max = opts.totalPage;
			}
			if(max - min < opts.viewPageNum){
				min = max - opts.viewPageNum;
			}
			// 防止越界
			if(min < 0){
				min = 0;
			}
			// 显示翻页数字
			for(var i = min;i < max;i++){
				// 如果为当前页，则设置特殊css样式
				if((i+1) == opts.currentPage){
					pageBox = pageBox+'		<li class="chos"> <a onclick="MicePage_toPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\','+(i+1)+','+opts.totalPage+','+opts.overPageFunc+','+opts.underPageFunc+', 0)"> '+(i+1)+' </a></li>';
				}else{
					pageBox = pageBox+'		<li> <a onclick="MicePage_toPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\','+(i+1)+','+opts.totalPage+','+opts.overPageFunc+','+opts.underPageFunc+', 0)"> '+(i+1)+' </a></li>';
				}
			}
			pageBox = pageBox+'		<li> <a onclick="MicePage_toPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\','+(opts.currentPage+1)+','+opts.totalPage+','+opts.overPageFunc+','+opts.underPageFunc+', 0)"> > </a></li>';
			pageBox = pageBox+'	 </ul>';
			pageBox = pageBox+'	 <input type="button" class="weiYe" value="尾页" onclick="MicePage_toPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\','+opts.totalPage+','+opts.totalPage+','+opts.overPageFunc+','+opts.underPageFunc+', 0)"/>';
			pageBox = pageBox+' </div>';
			pageBox = pageBox+' <p>';
			pageBox = pageBox+'	 跳转';
			pageBox = pageBox+'	 <input type="text" id="'+thisID+'_MiceToPage" value="" />';
			pageBox = pageBox+'	 页';
			pageBox = pageBox+' </p>';
			pageBox = pageBox+' <input type="button" name="" class="queDing" value="确定" onclick="MicePage_InputToPage(\''+thisID+'_micePageForm\',\''+thisID+'_micePageFormCurrentPage\',\''+thisID+'_MiceToPage\','+opts.totalPage+','+opts.inputValidationFunc+','+opts.overPageFunc+','+opts.underPageFunc+')"/>';
			pageBox = pageBox+'</div>';
		$(this).wrap($(pageBox));
	};
})(jQuery); 
// 跳转页面
function MicePage_toPage(formID, pageNoID, pageNo, totalPage, overPageFunc, underPageFunc, type){
	if(pageNo < 1){
		if(type == 0){
			return false;
		}
		underPageFunc();
	}else if(pageNo > totalPage){
		if(type == 0){
			return false;
		}
		overPageFunc();
	}else{
		$('#'+pageNoID).attr('value' ,pageNo);
		$('#'+formID).submit();
	}
}
// 根据输入值跳转
function MicePage_InputToPage(formID, pageNoID, pageParamID, totalPage, inputValidationFunc, overPageFunc, underPageFunc){
	var pageNo = $('#'+pageParamID).val();
	if(!/^[0-9]*$/.test(pageNo)){  
		inputValidationFunc();
    }else{
    	MicePage_toPage(formID, pageNoID, pageNo, totalPage, overPageFunc, underPageFunc, 1);
    }
}

