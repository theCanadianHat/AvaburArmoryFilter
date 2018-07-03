// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      1.3.5
// @description  Enhanced Filter for Armory in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://*.avabur.com/game*
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    var WEAPONS = ["SWORDS", "BOWS", "STAVES"];
    var ARMOR = ["HELMETS", "BREASTPLATES", "GLOVES", "BOOTS", "SHIELDS", "QUIVERS"];
    var Bp = [":)",":(",":/","B)","<3",":D",":P","CLICKING!",":O","XD","More!!","Coming","Soon"];

    var filterDiv;
    var typeSelect;
    var itemSelect;
    var levelInput;
    var powerInput;
    var containsGemsInput;
    var itemAvailableInput;
    var comingSoon;
    var filterButton;
    var clearFilterButton;
    var armorySearch;
    var advancedHidden = true;

    function createTypeSelect(){
        var row = $("<div>").attr("id", "armoryFilterDiv").addClass("row").css("padding","0px 15px");
        var basic = $("<div>").attr("id", "basicFilters").addClass("row");
        var criteria = $("<div>").addClass("col-md-9");
        var submit = $("<div>").addClass("col-md-3");
        var advanced = $("<div>").attr("id", "advancedFilters").addClass("row").css("padding-top","2px");

        typeSelect = $("<select>")
          .attr("id", "itemSelectTypeSelect")
          .addClass("col-md-12")
          .css({"height":"24px","text-align-last":"center"});
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");

        var temp = $("<div>").addClass("col-md-2").css({"padding-left":"0px","padding-right":"2px"});
        temp.append(typeSelect);
        criteria.append(temp);

        itemSelect = $("<select>").attr("id", "itemSelectSelect").addClass("col-md-12").css({"height":"24px","text-align-last":"center"});
        itemSelect.append("<option value=''>--Item--</option>");
        itemSelect.append("<option value='Swords' class='wep'>Swords</option>");
        itemSelect.append("<option value='Bows' class='wep'>Bows</option>");
        itemSelect.append("<option value='Staves' class='wep'>Staves</option>");
        itemSelect.append("<option value='Helmets' class='arm'>Helmets</option>");
        itemSelect.append("<option value='Breastplates' class='arm'>Breastplates</option>");
        itemSelect.append("<option value='Gloves' class='arm'>Gloves</option>");
        itemSelect.append("<option value='Boots' class='arm'>Boots</option>");
        itemSelect.append("<option value='Shields' class='arm'>Shields</option>");
        itemSelect.append("<option value='Quivers' class='arm'>Quivers</option>");

        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append(itemSelect);
        criteria.append(temp);



        levelInput = $("<input placeholder='Lvl' type='number'/>")
            .attr("id", "levelInput")
            .attr("title", "Greater than or Equals")
            .addClass("col-md-12")
            .css({"height":"24px","text-align":"center"});
        temp = $("<div>").addClass("col-md-2").css({"padding":"0px 2px"});
        temp.append(levelInput);
        criteria.append(temp);

        powerInput = $("<input placeholder='Pwr' type='number'/>")
            .attr("id", "powerInput")
            .attr("title","Greater than or Equals")
            .addClass("col-md-12")
            .css({"height":"24px","text-align":"center"});
        temp = $("<div>").addClass("col-md-2").css({"padding":"0px 2px"});
        temp.append(powerInput);
        criteria.append(temp);

        containsGemsInput = $("<input type='checkbox' id='containsGemsInput' style='vertical-align: middle;'/>")
        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append($("<label for='containsGemsInput'>Has Gems:</label>"));
        temp.append(containsGemsInput);
        criteria.append(temp);

        itemAvailableInput = $("<input type='checkbox' id='itemAvailableInput' style='vertical-align: middle;'/>")
        temp = $("<div>").addClass("col-md-2").css("padding","0px 2px");
        temp.append($("<label for='itemAvailableInput'>Can Barrow:</label>"));
        temp.append(itemAvailableInput);
        criteria.append(temp);

        comingSoon = $("<button>:)</button>").attr("id","comingSoonButton").attr("title","Updates coming!!!").addClass("col-md-12").css("height","24px");
        temp = $("<div>").addClass("col-md-4").css({"padding":"0px 2px"});
        temp.append(comingSoon);
        submit.append(temp);

        clearFilterButton = $("<button>Clear</button>").attr("id","clearFilterButton").addClass("col-md-12").css("height","24px");
        temp = $("<div>").addClass("col-md-4").css({"padding":"0px 2px"});
        temp.append(clearFilterButton);
        submit.append(temp);

        temp = $("<div>").addClass("col-md-4").css({"padding-left":"2px","padding-right":"0px"});
        filterButton = $("<button>Filter</button>").attr("id", "armoryFilterButton").addClass("col-md-12").css("height","24px");
        temp.append(filterButton);
        submit.append(temp);

        basic.append(criteria);
        basic.append(submit);

        row.append(basic);

        var itemBoosts = $("<select>").attr("id","itemBoostSelect");
        itemBoosts.append($("<option value=''>--Item Boost--</option>"));
        itemBoosts.append($("<option value=''>Agility</option>"));
        itemBoosts.append($("<option value=''>Brawling</option>"));
        itemBoosts.append($("<option value=''>Celerity</option>"));
        itemBoosts.append($("<option value=''>Chronokinesis</option>"));
        itemBoosts.append($("<option value=''>Coordination</option>"));
        itemBoosts.append($("<option value=''>Dueling</option>"));
        itemBoosts.append($("<option value=''>Endurance</option>"));
        itemBoosts.append($("<option value=''>Etching</option>"));
        itemBoosts.append($("<option value=''>Greed</option>"));
        itemBoosts.append($("<option value=''>Harvesting</option>"));
        itemBoosts.append($("<option value=''>Health</option>"));
        itemBoosts.append($("<option value=''>Luck</option>"));
        itemBoosts.append($("<option value=''>Mastery</option>"));
        itemBoosts.append($("<option value=''>Piercing</option>"));
        itemBoosts.append($("<option value=''>Potency</option>"));
        itemBoosts.append($("<option value=''>Recklessness</option>"));
        itemBoosts.append($("<option value=''>Recovery</option>"));
        itemBoosts.append($("<option value=''>Resilience</option>"));
        itemBoosts.append($("<option value=''>Restoration</option>"));
        itemBoosts.append($("<option value=''>Retaliation</option>"));
        itemBoosts.append($("<option value=''>Retribution</option>"));
        itemBoosts.append($("<option value=''>Smithing</option>"));
        itemBoosts.append($("<option value=''>Sniping</option>"));
        itemBoosts.append($("<option value=''>Sorcery</option>"));
        itemBoosts.append($("<option value=''>Strength</option>"));
        itemBoosts.append($("<option value=''>Swiftness</option>"));
        itemBoosts.append($("<option value=''>Wisdom</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding-left":"0px","padding-right":"2px"});
        temp.append(itemBoosts);
        advanced.append(temp);

        var gemBoosts = $("<select>").attr("id","gemBoostSelect");
        gemBoosts.append($("<option value=''>--Gem Boost--</option>"));
        gemBoosts.append($("<option value=''>Agility</option>"));
        gemBoosts.append($("<option value=''>Brawling</option>"));
        gemBoosts.append($("<option value=''>Celerity</option>"));
        gemBoosts.append($("<option value=''>Chronokinesis</option>"));
        gemBoosts.append($("<option value=''>Coordination</option>"));
        gemBoosts.append($("<option value=''>Dueling</option>"));
        gemBoosts.append($("<option value=''>Endurance</option>"));
        gemBoosts.append($("<option value=''>Etching</option>"));
        gemBoosts.append($("<option value=''>Greed</option>"));
        gemBoosts.append($("<option value=''>Harvesting</option>"));
        gemBoosts.append($("<option value=''>Health</option>"));
        gemBoosts.append($("<option value=''>Luck</option>"));
        gemBoosts.append($("<option value=''>Mastery</option>"));
        gemBoosts.append($("<option value=''>Piercing</option>"));
        gemBoosts.append($("<option value=''>Potency</option>"));
        gemBoosts.append($("<option value=''>Recklessness</option>"));
        gemBoosts.append($("<option value=''>Recovery</option>"));
        gemBoosts.append($("<option value=''>Resilience</option>"));
        gemBoosts.append($("<option value=''>Restoration</option>"));
        gemBoosts.append($("<option value=''>Retaliation</option>"));
        gemBoosts.append($("<option value=''>Retribution</option>"));
        gemBoosts.append($("<option value=''>Smithing</option>"));
        gemBoosts.append($("<option value=''>Sniping</option>"));
        gemBoosts.append($("<option value=''>Sorcery</option>"));
        gemBoosts.append($("<option value=''>Strength</option>"));
        gemBoosts.append($("<option value=''>Swiftness</option>"));
        gemBoosts.append($("<option value=''>Wisdom</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding":"0px 2px"});
        temp.append(gemBoosts);
        advanced.append(temp);

        var levelCompare = $("<select>").attr("id","levelCompareSelect");
        levelCompare.append($("<option value='ge'>>=</option>"));
        levelCompare.append($("<option value='g'>></option>"));
        levelCompare.append($("<option value='e'>=</option>"));
        levelCompare.append($("<option value='l'><</option>"));
        levelCompare.append($("<option value='le'><=</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding":"0px 2px"});
        temp.append(levelCompare);
        advanced.append(temp);

        var powerCompare = $("<select>").attr("id","powerCompareSelect");
        powerCompare.append($("<option value='ge'>>=</option>"));
        powerCompare.append($("<option value='g'>></option>"));
        powerCompare.append($("<option value='e'>=</option>"));
        powerCompare.append($("<option value='l'><</option>"));
        powerCompare.append($("<option value='le'><=</option>"));
        temp = $("<div>").addClass("col-md-3").css({"padding-left":"2px","padding-right":"0px"});
        temp.append(powerCompare);
        advanced.append(temp);
        advanced.hide();

        row.append(advanced);
        return row;
    }

    function insertHtml(){
        filterDiv = createTypeSelect();
        armorySearch = $("#clanInventoryTable_filter");
        armorySearch.after(filterDiv);
        //armoryOldFilter.hide();
    };

    function setupWatches(){
        filterButton.on("click", function(){
            //console.log("Filtering Armory Selection for Type: " + typeSelect.val() + ", Item: " + itemSelect.val() + ", Level: " + levelInput.val());
            $("#clanInventoryTable").DataTable().draw();
        });

        typeSelect.change(function(event){
            var selection = $(this).val();
            if(selection != ''){
                if(selection == 'weapon'){
                    hideArmor();
                    showWeapons();
                }else{
                    showArmor();
                    hideWeapons();
                }
                resetItems();
            }else{
                showItems();
            }
        });

        $(".closeModal, #modalBackground").on("click", function(e){
            e.preventDefault();
            resetFilter();
        });

        comingSoon.on("click", function() {
            var i = Math.floor((Math.random() * Bp.length));
            comingSoon.text(Bp[i]);
            advancedHidden = !advancedHidden;
            if(advancedHidden){
              $('#advancedFilters').slideUp();
            }else{
              $('#advancedFilters').slideDown();
            }
        });

        levelInput.dblclick(function(){
            //get current level
            levelInput.val($("#level").html());
        });

        powerInput.dblclick(function(){
            //get current power
            var id = powerForWhat();
            var json = $("#"+id).data("json");
            if($.isEmptyObject(json)){
                powerInput.val("0");
            }else{
                powerInput.val(json.p);
            }
        });

        clearFilterButton.on("click", function(){
            resetFilter();
            $("#clanInventoryTable").DataTable().settings()["0"].oPreviousSearch.sSearch = "";
            $("#clanInventoryTable").DataTable().draw();
        });

        comingSoon.on("click", function() {
          var i = Math.floor((Math.random() * Bp.length));
          comingSoon.text(Bp[i]);
        });


    };

    function hideWeapons(){
        itemSelect.children(".wep").hide();
    }

    function showWeapons(){
        itemSelect.children(".wep").show();
    }

    function hideArmor(){
        itemSelect.children(".arm").hide();
    }

    function showArmor(){
        itemSelect.children(".arm").show();
    }

    function showItems(){
        showArmor();
        showWeapons();
        resetItems();
    }

    function resetItems(){
        if(itemSelect.val() != ''){
            itemSelect.val('');
        }
    }

    function resetFilter(){
        if(typeSelect.val() != ''){
            typeSelect.val("");
        }
        if(itemSelect.val() != ''){
            itemSelect.val("");
        }
        if(levelInput.val() != ''){
            levelInput.val("");
        }
        if(powerInput.val() != ''){
            powerInput.val("");
        }
        if(containsGemsInput[0].checked){
            containsGemsInput[0].checked = false;
        }
        if(itemAvailableInput[0].checked){
            itemAvailableInput[0].checked = false;
        }
        if(armorySearch.find("input").val() != ''){
            armorySearch.find("input").val('');
        }
    }

    function powerForWhat(){
        var type = typeSelect.val() == '' ? false : typeSelect.val();
        var item = itemSelect.val() == '' ? false : itemSelect.val();

        if(item != false){
            var itemType = itemSelectIsWeapon(item) ? "weapon" : "armor";
            if("armor"){
                switch(item){
                    case "Helmets":
                        return "helmet";
                    case "Breastplates":
                        return "breastplate";
                    case "Gloves":
                        return "gloves";
                    case "Boots":
                        return "boots";
                    case "Shields":
                    case "Quivers":
                        return "shield"
                }
            }
            return itemType;
        }

        if(type != false){
            if(type == "weapon"){
                return "weapon";
            }else{
                return "helmet";
            }
        }

        return "weapon";

    }

    function itemSelectIsWeapon(itemSelectType){
        return WEAPONS.indexOf(itemSelectType.toUpperCase()) > -1;
    }

    function itemSelectIsArmor(itemSelectType){
        return ARMOR.indexOf(itemSelectType.toUpperCase()) > -1;
    }

    function init() {
        //console.log("Initializing Armory Filter");
        insertHtml();
        setupWatches();
    };

    $(window).on("load", function(){
        init();
    });


    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex){
            if(settings.sInstance != "clanInventoryTable"){
                return true;
            }else{
                /*
                data[0] name
                data[1] levelInput
                data[2] powerInput
                data[3] gems
                data[4] bonuses
                data[5] holder
                data[6] type
                */
                if(noFilter()){
                    return true;
                }

                var gems = containsGemsInput[0].checked ? data[3] != "0" : true;
                if(!gems) { return false; }

                var available = itemAvailableInput[0].checked ? data[5] == "None" : true;
                if(!available) { return false; }

                var isLevel = levelInput.val() != '' ? parseInt(levelInput.val()) <= parseInt(data[1]) : true;
                if(!isLevel){ return false; }

                var isPower = powerInput.val() != '' ? parseInt(powerInput.val()) <= parseInt(data[2]) : true ;
                if(!isPower){ return false; }

                var isItem = itemSelect.val() != '' ? itemSelect.val() == data[6] : true;
                var isType = typeSelect.val() != '' ? typeSelect.val() == 'weapon' ? itemSelectIsWeapon(data[6]) : itemSelectIsArmor(data[6]) : true;

                return isLevel && isItem && isType && gems && available;
            }
        }
    );

    function noFilter(){

        if(typeof typeSelect === 'undefined'){
            return true;
        }

        return typeSelect.val() == '' &&
          itemSelect.val() == '' &&
          levelInput.val() == '' &&
          powerInput.val() == '' &&
          !containsGemsInput[0].checked &&
          !itemAvailableInput[0].checked;
    }

})(jQuery);
