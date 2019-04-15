
$(document).ready(function(){

	//Получнеие types
	$.get({
		url: "http://localhost:3000/types/",
		dataType: "json",
		success: function(msg){
			if (msg["status"]=="success"){
				msg["data"].forEach(function(item,msg){
					$("#inputTypes").append(`<option id="${item["id"]}">${item["name"]}</option>`);
				});
			}
		}
	});

	//Получение tags
	$.get({
		url: "http://localhost:3000/tags/",
		dataType: "json",
		success: function(msg){
			if (msg["status"]=="success"){
				msg["data"].forEach(function(item,msg){
					$("#ListOfTags").append(`<li class="tag_item" id="${item["id"]}">${item["name"]}</li>`);
					
				});
				$('.tag_item').on("click",function(){
					var el = `<li class="choosen_tag_item show" id="${$(this).attr('id')}">${$(this).text()}<i class="material-icons clear-icon">clear</i></li>`;
					console.log(el);
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

	$('#inputTag').on('input',function(){

		$("#ListOfTags").dropdown('show');
		$('#ListOfTags li').prop('hidden',false);
		$(`#ListOfTags li:not(:contains("${$("#inputTag").val()}"))`).prop('hidden', true);//Для показа только подходящих элементов
		//$('#ListOfTags li:contains("01")').prop('hidden', true);//Для сокрытия элемента при выборе
	});

	$('.choosen_tag_item').click(function(){
		console.log($(this));
		$('#ListOfTags').children('#'+$(this).attr('id')).show();
		$(this).removeClass('show');
	});

	/*$('.tag_item').on("click",function(){
	//$('.tag_item').click(function(){
		//$('#ListOfChoosenTags').children('#'+$(this).attr('id')).addClass('show');//append('<li class="choosen_tag_item" id="'+$(this).attr("id")+'">'+$(this).text()+'</li>');
		//var el = `<li class="choosen_tag_item" id="${$(this).attr('id')}">${$(this).text()}<i class="material-icons clear-icon">clear</i></li>`;
		//console.log(el);
		//$("#ListOfChoosenTags").append(el);
		console.log('check');
		$(this).hide();
	});*/

})
