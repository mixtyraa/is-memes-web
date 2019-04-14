
$(document).ready(function(){
	$('#ListOfChoosenTags li').hide();

	$('#inputTag').on('input',function(){

		$("#ListOfTags").dropdown('show');
		$('#ListOfTags li').prop('hidden',false);
		$('#ListOfTags li:not(:contains("'+$("#inputTag").val()+'"))').prop('hidden', true);//Для показа только подходящих элементов
		//$('#ListOfTags li:contains("01")').prop('hidden', true);//Для сокрытия элемента при выборе
	});

	$('.choosen_tag_item').click(function(){
		console.log($(this));
		$('#ListOfTags').children('#'+$(this).attr('id')).show();
		$(this).hide();
	});

	$('.tag_item').click(function(){
		$('#ListOfChoosenTags').children('#'+$(this).attr('id')).show();//append('<li class="choosen_tag_item" id="'+$(this).attr("id")+'">'+$(this).text()+'</li>');
		$(this).hide();
	});

})
