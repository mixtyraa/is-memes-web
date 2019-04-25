
$(document).ready(function(){

	//Получнеие types
	$.get({
		url: "http://localhost:3000/types/",
		dataType: "json",
		success: function(msg){
			if (msg["status"]=="success"){
				msg["data"].forEach(function(item,msg){
					$("#ListOfTypes").append(`<li class="type_item" id="${item["id"]}">${item["name"]}</li>`);
				});
			}
		}
	});

	$('#inputTag').on('input',function(){

		$("#ListOfTags").dropdown('show');
		$('#ListOfTags li').prop('hidden',false);
		$(`#ListOfTags li:not(:contains("${$("#inputTag").val()}"))`).prop('hidden', true);//Для показа только подходящих элементов
		
		if ($(this).val()=="") {
			$("#ListOfTags li").remove();
		}

		if ($(this).val()!="") {
			$("#ListOfTags li").remove();
			//Получение tags по введённой фразе
			$.get({
				url: "http://localhost:3000/tags/",
				data: {q: $(this).val()},
				success: function(msg){
					if (msg["status"]=="success") {
						msg["data"].forEach(function(item,msg){
							if ($("#ListOfChoosenTags").find("#"+item["id"]).length==0) {
								$("#ListOfTags").append(`<li class="tag_item" id="${item["id"]}">${item["name"]}</li>`);
							}
								
						});
						$('.tag_item').on("click",function(){
							var el = `<li class="choosen_tag_item show" id="${$(this).attr('id')}">${$(this).text()}<i class="material-icons clear-icon">clear</i></li>`;
							//console.log(el);
							$("#ListOfChoosenTags").append(el);
		
							$('.clear-icon').on("click",function(){
								console.log($(this));
								$('#ListOfTags').children('#'+$(this).parent().attr('id')).show();
								$(this).parent().remove();
							});
		
							$(this).hide();
						});
					}
				}

			});
		}
	});

	$('.choosen_tag_item').click(function(){
		console.log($(this));
		$('#ListOfTags').children('#'+$(this).attr('id')).show();
		$(this).removeClass('show');
	});

})
