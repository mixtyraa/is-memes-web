$(document).ready(function () {

	loadTypes();

	//Действие при вводе символов в поле выбора тэга
	$('#inputTag').on('input', function () {

		//$("#ListOfTags").dropdown('show');
		//$('#ListOfTags li').prop('hidden',false);
		//$(`#ListOfTags li:not(:contains("${$("#inputTag").val()}"))`).prop('hidden', true);//Для показа только подходящих элементов

		if ($(this).val() == "") {
			$("#ListOfTags li").remove();
		}

		if ($(this).val() != "") {
			$("#ListOfTags li").addClass('delete_li');
			//Получение tags по введённой фразе
			$.get({
				url: "http://localhost:3000/tags/",
				data: {
					q: $(this).val()
				},
				success: function (msg) {
					if (msg["status"] == "success") {
						msg["data"].forEach(function (item, msg) {
							if ($("#ListOfChoosenTags").find("#" + item["id"]).length == 0) {
								const t = $("#ListOfTags").find("#" + item["id"]);
								if (!t.length) {
									$(`<li class="tag_item" id="${item["id"]}">${item["name"]}</li>`).appendTo("#ListOfTags")
										.on("click", function () {
											var el = `<li class="choosen_tag_item show" id="${$(this).attr('id')}">${$(this).text()}<i class="material-icons clear-icon">clear</i></li>`;
											//console.log(el);
											$("#ListOfChoosenTags").append(el);

											$('.clear-icon').on("click", function () {
												//console.log($(this));
												$('#ListOfTags').children('#' + $(this).parent().attr('id')).show();
												$(this).parent().remove();
											});

											$(this).hide();
										});
								} else {
									t.removeClass('delete_li');
								}
							}

						});
					}
					$(".tag_item.delete_li").remove();
				}

			});
		}
	});

	//Действие при вводе символов в поле выбора типа
	$('#inputType').on('input', function () {
		$("#ListOfTypes").dropdown('show');
		$('#ListOfTypes li').prop('hidden', false);
		$(`#ListOfTypes li:not(:contains("${$("#inputType").val()}"))`).prop('hidden', true);
	});

	//Удаление выбранного тэга
	$('.choosen_tag_item').click(function () {
		console.log($(this));
		$('#ListOfTags').children('#' + $(this).attr('id')).show();
		$(this).removeClass('show');
	});

	//Добавление нового типа
	$('#newType').click(() => {
		console.log('clicked');
		const name = $("#newTypeField").val();
		if (name.length) {
			console.log('posting');
			$.ajax({
				method: 'POST',
				url: 'http://localhost:3000/types',
				data: JSON.stringify({
					name
				}),
				success: data => {
					console.log(data);
					loadTypes();
				},
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
	});

	//Добавление нового тэга
	$('#newTag').click(() => {
		console.log('clicked');
		const name = $("#newTagField").val();
		if (name.length) {
			console.log('posting');
			$.ajax({
				method: 'POST',
				url: 'http://localhost:3000/tags',
				data: JSON.stringify({
					name
				}),
				success: data => {
					console.log(data);
				},
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
	});
});

//Получнеие types
function loadTypes() {
	$.get({
		url: "http://localhost:3000/types/",
		dataType: "json",
		success: function (msg) {
			if (msg["status"] == "success") {
				$("#ListOfTypes li").remove();
				msg["data"].forEach(function (item, msg) {
					$("#ListOfTypes").append(`<li class="type_item" id="${item["id"]}">${item["name"]}</li>`);
				});
			}
		}
	});
}