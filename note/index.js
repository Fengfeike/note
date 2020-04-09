//菜单
var $box = $('#note');
var $menu = (function () {
    var $bar = $('<div id="menu" class="menu"></div>');
    var active = -1;  
    var data = [
      {
        title: '文件',
        items: [
          {
            title: '新建',
          },
          {
            title: '保存',
          }
        ],
      },
      {
        title: '编辑',
        items: [
          {
            title: '剪切',
          },
          {
            title: '复制',
          },
          {
            title: '粘贴',
          }
        ],
      },
      {
        title: '格式',
        items: [
          {
            title: '字体',
          },
        ],
      },
      {
        title: '查看',
        items: [
          {
            title: '查看',
          },
        ],
      },
      {
        title: '帮助',
        items: [
          {
            title: '帮助',
          },
        ],
      },
    ]; 
    function initTitle() {
      var $title0 = $('<ul class="menu-title"></ul>');
      for (var i = 0; i < data.length; i++) {
        var $title = $('<li class="menu-title-items"></li>');
        $title.html(data[i].title);
        $title.attr('menu-title', i);
        $title0.append($title);
        $bar.append($title0);
  
        $title.click(function (e) {
          active = $(this).attr('menu-title');
          showObject();
          e.stopPropagation();
        });
  
        $title.hover(function () {
          if (active !== -1) {
            active = $(this).attr('menu-title');
            showObject();
          }
        });
      }
    }
  
    function initObject() {
      for (var i = 0; i < data.length; i++) {
        var items = '';
        for(var j = 0; j<data[i].items.length; j++){
          items += '<li class="menu-items-items" menu-items=' + i + '-' + j + '>' + data[i].items[j].title + '</li>';
        }
        var $items = $('<ul class="menu-items">' + items + '</ul>');
        $items.css('left', i * 54);
        $bar.append($items);
      }
      active = -1;
      $font.init();
      $bar.find('[menu-items=\'2-0\']').click(function(){
        $font.show();
      });
    }
  
    function showObject() {
      var $items = $('.menu-items');
      $items.css('display', 'none');
      if (active != -1) {
        $items.eq(active).css('display', 'inline-block');
      }
    }
  
    function hideObject() {
      active = -1;
      showObject();
    }
  
    function init() {
      initTitle();
      initObject();
      $box.append($bar);
    }
  
    return {
      init: init,
      hideObject: hideObject,
    };
  })();

var $font = (function () {
    var $dlg = $(
      '' +
          '<div  id="font" class="font">' +
          '<div class="fontbox">' +
          '<div class="fonttitle">' +
          '<p class="fonttitle-text">字体</p>' +
          '<span class="fonttitle-cbutton" title="关闭">✖</span>' +
          '</div>' +
          '<div class="fontmain">' +
          '<div class="fontmain-family"><p>字体(F):</p></div>' +
          '<div class="fontmain-style"><p>字形(Y):</p></div>' +
          '<div class="fontmain-size"><p>大小(S):</p></div>' +
          '<fieldset class="fontmain-sample">' +
          '<legend>示例</legend>' +
          '<p class="fontmain-sample-txt">AaBbYyZz</p>' +
          '</fieldset>' +
          '<div class="fontmain-script">' +
          '<label>' +
          '<span>脚本(R):</span>' +
          '<select>' +
          '<option value="西欧语言">西欧语言</option>' +
          '<option value="中文 GB2312">中文 GB2312</option>' +
          '</select>' +
          '</label>' +
          '</div>' +
          '</div>' +
          '<div class="fontfoot">' +
          '<input class="fontfoot-ok" type="button" value="确定">' +
          '<input class="fontfoot-cancel" type="button" value="取消">' +
          '</div>' +
          '</div>' +
          '</div>'
    );
  
    var $cbutton = $dlg.find('.fonttitle-cbutton');
    var $cancel = $dlg.find('.fontfoot-cancel');
    var $okbtn = $dlg.find('.fontfoot-ok');
    var $family = $dlg.find('.fontmain-family');
    var $style = $dlg.find('.fontmain-style');
    var $size = $dlg.find('.fontmain-size');
    var $sample = $dlg.find('.fontmain-sample-txt');
    // var $script = $dlg.find(".fontmain-script");
  
    var fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'];
    var styles = ['常规', '斜体', '粗体', '粗偏斜体'];
    var sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
      
    var config={};
  
    function initfamily(arr, $list) {
      for (var i = 0; i < arr.length; i++) {
        var $item = $('<li class="fontmain-list-item"></li');
        $item.css('font-family', arr[i]);
        if(arr[i]==cfg.family){
          $item.addClass('use');
        }
        $item.html(arr[i]);
        $list.append($item);
        $item.click(function(){
          $('div.fontmain-family .fontmain-list-item').removeClass('use');
          $(this).addClass('use');
          cfg.family=$(this).html();
          showtitle();
          showsample();
        });
      }
    }
    function initstyles(arr, $list) {
      for (var i = 0; i < arr.length; i++) {
        var $item = $('<li class="fontmain-list-item"></li');
        $item.html(arr[i]);
        if (arr[i] == '斜体') {
          $item.css('font-style', 'italic');
        } else if (arr[i] == '粗体') {
          $item.css('font-weight', 'bold');
        } else if (arr[i] == '粗偏斜体') {
          $item.css('font-style', 'italic');
          $item.css('font-weight', 'bold');
        }
        if(arr[i]==cfg.style){
          $item.addClass('use');
        }
        $list.append($item);
        $item.click(function(){
          $('div.fontmain-style .fontmain-list-item').removeClass('use');
          $(this).addClass('use');
          cfg.style=$(this).html();
          showtitle();
          showsample();
        });
      }
    }
    function initsize(arr, $list) {
      for (var i = 0; i < arr.length; i++) {
        var $item = $('<li class="fontmain-list-item"></li');
        if(arr[i]==cfg.size){
          $item.addClass('use');
        }
        $item.html(arr[i]);
        $list.append($item);
        $item.click(function(){
          $('div.fontmain-size .fontmain-list-item').removeClass('use');
          $(this).addClass('use');
          cfg.size=$(this).html();
          showtitle();
          showsample();
        });
      }
    }
    function initlist(arr, $box) {
      var $list = $('<ul class="fontmain-list"></ul>');
      var $title = $('<input class="fontmain-list-title" type="text">');
      var $choice = $('<div class="fontmain-box"></div>');
      var boxclass = $box.attr('class');
      if (boxclass == 'fontmain-family') {
        initfamily(arr, $list);
      } else if (boxclass == 'fontmain-style') {
        initstyles(arr, $list);
      } else {
        initsize(arr, $list);
      }
      $choice.append($title);
      $choice.append($list);
      $box.append($choice);
    }
    function init() {
      config=cfg;
      $('#note').append($dlg);
      initlist(fonts, $family);
      initlist(styles, $style);
      initlist(sizes, $size);
      showtitle();
      showsample();
    }
  
    function showtitle(){
      $('div.fontmain-family input').val(config.family);
      $('div.fontmain-style input').val(config.style);
      $('div.fontmain-size input').val(config.size);
    }
    function showsample(){
      $sample.css('font-family', config.family);
      $sample.css('font-size', config.size+'px');
      if (config.style == '斜体') {
        $sample.css('font-style', 'italic');
        $sample.css('font-weight','normal');
      } else if (config.style == '粗体') {
        $sample.css('font-style','normal');
        $sample.css('font-weight', 'bold');
      } else if (config.style == '粗偏斜体') {
        $sample.css('font-style', 'italic');
        $sample.css('font-weight', 'bold');
      }else{
        $sample.css('font-style','normal');
        $sample.css('font-weight','normal');
      }
    }
  
    function close() {
      $dlg.css('display', 'none');
    }
    $cbutton.click(function () {
      close();
    });
    $cancel.click(function () {
      close();
    });
  
    $okbtn.click(function(){
      $.extend(cfg,config);
      $text.show();
      close();
    });
  
    function show() {
      $dlg.css('display', 'block');
    }
  
    $dlg.click(function (e) {
      e.stopPropagation();
    });
  
    return {
      init: init,
      show: show,
    };
  })();
var cfg = {
    family: 'Arial',
    style: '常规',
    size: '16',
  };
  $(function () {
    $menu.init();
    $text.init();
    var $body = $('body');
    $body.click(function () {
      $menu.hideObject();
    });
  });
var $text = (function () {
    var $box = $('#note');
    var $area = $('<div id="text" class="text"></div>');
    var $context = $('<textarea spellcheck="false"></textarea>');
  
    function init() {
      $area.css('height', window.innerHeight - 27);
      $area.append($context);
      $box.append($area);
    }
    function show(){
      $context.css('font-family', cfg.family);
      $context.css('font-size', cfg.size+'px');
      if (cfg.style == '斜体') {
        $context.css('font-style', 'italic');
        $context.css('font-weight','normal');
      } else if (cfg.style == '粗体') {
        $context.css('font-style','normal');
        $context.css('font-weight', 'bold');
      } else if (cfg.style == '粗偏斜体') {
        $context.css('font-style', 'italic');
        $context.css('font-weight', 'bold');
      }else{
        $context.css('font-style','normal');
        $context.css('font-weight','normal');
      }
    }
    $(window).resize(function(){
      $area.css('height', window.innerHeight - 27);
    });
  
    return {
      init: init,
      show: show
    };
  }());