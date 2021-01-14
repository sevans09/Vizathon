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
    $( "#dem_options" ).hide();

    var slider = document.querySelector('input[type="range"]');
    var radio = document.querySelector('input[type="radio"]');
    var val = document.getElementById("myRange").value;
    var dem = $("input[name='dem_radio']:checked").val();

    slider.addEventListener('change', function() {
        // $(".bubbleTitle").text( $("input[name='dem_radio']:checked").val())
        change_move();
    });

    // window.addEventListener('keypress', function(e) {
    //     // $(".bubbleTitle").text( $("input[name='dem_radio']:checked").val())
    //     var keyCode = e.keyCode;
    //     var key = keyCode - 48
    //     if (key > 0 && key < 10) {
    //     document.getElementById("myRange").value = key;
    //     change_move();
    //     }
    // });

    makeMap(us);

    $( "#dem_options" ).show();
    $("#bubbles").css("visibility", "visible"); 
    $("#dem_options").css("visibility", "visible")

    var val = document.getElementById("myRange").value;
    dem = $("input[name='dem_radio']:checked").val();
    make_bubbles_rep(us, val, dem)

    $('#radio_options').change(function(){
    
        dem = $("input[name='dem_radio']:checked").val();
        if (dem == 'unemp') { 
            $(".tooltiptext").text("The bubble graph below depicts the relationship between the % obese in a county and county’s adult unemployment rate; size of bubbles reflects county population")
            $(".dropbtn").html("Unemployment Rate &#9660;") 
        }
        else if (dem == 'income') { 
            $(".tooltiptext").text("The bubble graph below depicts the relationship between the % obese in a county and county’s median income; size of bubbles reflects county population")
            $(".dropbtn").html("Median Income &#9660;")
        }
        else if (dem == 'cpr') { 
            $(".tooltiptext").text("The bubble graph below depicts the relationship between the % obese in a county and county’s childhood poverty rate; size of bubbles reflects county population")
            $(".dropbtn").html("Childhood Poverty Rate &#9660") }
        else if (dem == 'smoke') { 
            $(".tooltiptext").text("The bubble graph below depicts the relationship between the % obese in a county and the % of a county that smokes; size of bubbles reflects county population")
            $(".dropbtn").html("Smoking &#9660") }
        else if (dem == 'exer') {
            $(".tooltiptext").text("The bubble graph below depicts the relationship between the % obese in a county and the % of a county with easy access to exercise opportunities; size of bubbles reflects county population")
            $(".dropbtn").html("Exercise Opportunities &#9660") }
        else if (dem == 'drink') { 
            $(".tooltiptext").text("The bubble graph below depicts the relationship between the % obese in a county and the % of a county that drinks heavily (consumed 5+ alcoholic drinks on at least one occasion for the past 3 months); size of bubbles reflects county population")
            $(".dropbtn").html("Excessive Drinking &#9660") }

        var val = document.getElementById("myRange").value;
        // make_bubbles_rep(true, val, dem)
        update_demographic(dem, val)
    });
}
