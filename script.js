let listOfChoosenTags;
const url_api = 'http://localhost:3000';

import Person from 'Person.js';

$(document).ready(function () {
  
  listOfChoosenTags = $('#ListOfChoosenTags');

  loadTypes();
  initTags();

  //Действие при вводе символов в поле выбора типа
  $('#inputType').on('input', function () {
    $('#ListOfTypes').dropdown('show');
    $('#ListOfTypes li').prop('hidden', false);
    $(`#ListOfTypes li:not(:contains('${$('#inputType').val()}'))`).prop('hidden', true);
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
    const name = $('#newTypeField').val();
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
    const name = $('#newTagField').val();
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
    url: 'http://localhost:3000/types/',
    dataType: 'json',
    success: function (msg) {
      if (msg['status'] == 'success') {
        $('#ListOfTypes li').remove();
        msg['data'].forEach(function (item, msg) {
          $('#ListOfTypes').append(`<li class='type_item' id='${item['id']}'>${item['name']}</li>`);
        });
      }
    }
  });
}

function initTags() {
  $('#ListOfTags').on('click', '.tag_item', (e) => {
    handleSelectTag({
      id: $(e.target).attr('id'),
      name: $(e.target).text(),
    })
  });

  listOfChoosenTags.on('click', '.clear-icon', (e) => {
    //console.log($(this));
    $('#ListOfTags').children('#' + $(e.target).parent().attr('id')).show();
    $(e.target).parent().remove();
  });

  //Действие при вводе символов в поле выбора тэга
  $('#inputTag').on('input', (e) => {
    const val = $(e.target).val();
    if (val.length) {
      getTags(val);
    } else {
      $('#ListOfTags li').remove();
    }
  });
}

/**
 * //Получение tags по введённой фразе
 */
function getTags(q) {
  $.get({
    url: 'http://localhost:3000/tags/',
    data: {
      q
    },
    success: (msg) => {
      if (msg['status'] === 'success') {
        updateTags(msg['data']);
      } else {
        updateTags([]);
      }
    }
  });
}

function handleSelectTag(tag) {
  const el = `<li class='choosen_tag_item show' id='${tag.id}'>${tag.name}<i class='material-icons clear-icon'>clear</i></li>`;
  listOfChoosenTags.append(el);
}

function updateTags(list) {
  $('#ListOfTags li').addClass('delete_li');
  list.forEach((item) => {
    if (listOfChoosenTags.find(`#${item['id']}`).length == 0) {
      const t = $('#ListOfTags').find(`#${item['id']}`);
      if (t.length) {
        t.removeClass('delete_li');
      } else {
        $(`<li class='tag_item' id='${item['id']}'>${item['name']}</li>`).appendTo('#ListOfTags');
      }
    }
  });
  $('.tag_item.delete_li').remove();
}
