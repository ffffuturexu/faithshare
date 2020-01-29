var map = {
    '信仰分享time': 'faithshare',
    '圣经词条': 'bibleentry'
}

var lable_a = $('li').children('a');
var active_label;
var swap = false;
lable_a.click(function() {
    lable_a.removeClass('active');
    $(this).addClass('active');
    active_label = $(this);
    swap = true;
});

function getswap() {
    return swap;
}

function getlabel() {
    label = new String(active_label[0].innerText)
    // console.log(label);
    return map[label];
}