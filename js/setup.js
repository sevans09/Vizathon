function num_with_commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function ready(error, us) {
    if (error) throw error;
    $( "#alertdiv" ).hide();
    $( "#dem_options" ).hide();

    var slider = document.querySelector('input[type="range"]');
    var radio = document.querySelector('input[type="radio"]');
    var val = document.getElementById("myRange").value;
    var dem = $("input[name='dem_radio']:checked").val();

    slider.addEventListener('change', function() {
        // $(".bubbleTitle").text( $("input[name='dem_radio']:checked").val())
        change_move();
    });

    window.addEventListener('keypress', function(e) {
        // $(".bubbleTitle").text( $("input[name='dem_radio']:checked").val())
        var keyCode = e.keyCode;
        var key = keyCode - 48
        if (key > 0 && key < 10) {
        document.getElementById("myRange").value = key;
        change_move();
        }
    });

    makeMap(us);

    $( "#dem_options" ).show();
    $("#bubbles").css("visibility", "visible"); 
    $("#dem_options").css("visibility", "visible")

    var val = document.getElementById("myRange").value;
    dem = $("input[name='dem_radio']:checked").val();
    make_bubbles_rep(us, val, dem)

    $('#radio_options').change(function(){
        dem = $("input[name='dem_radio']:checked").val();
        if (dem == 'unemp') { $(".dropbtn").html("Unemployment Rate &#9660;") }
        if (dem == 'income') { $(".dropbtn").html("Median Income &#9660;") }
        if (dem == 'poverty') { $(".dropbtn").html("Childhood Poverty Rate &#9660;") }
        var val = document.getElementById("myRange").value;
        // make_bubbles_rep(true, val, dem)
        update_demographic(dem, val)
    });
}