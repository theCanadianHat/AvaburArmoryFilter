// ==UserScript==
// @name         Avabur Armory Filter
// @namespace    njh.RoA
// @downloadURL  https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @updateURL    https://github.com/theCanadianHat/AvaburArmoryFilter/raw/master/AvaburArmoryFilter.user.js
// @version      0.1
// @description  Filter armory items in Avabur
// @author       AwesomePants (theCanadianHat)
// @match        https://*.avabur.com/game*
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';
    var filterDiv;
    var typeSelect;
    var item;
    var level;
    var filterButton;
    var armoryTable = $("#clanInventoryTable");

    function createTypeSelect(){
        var type = $("<div>").attr("id", "armoryFilter");
        typeSelect = $("<select>").attr("id", "type");
        typeSelect.append("<option value=''>--Type--</option>");
        typeSelect.append("<option value='weapon'>Weapons</option>");
        typeSelect.append("<option value='armor'>Armor</option>");
        type.append(typeSelect);

        item = $("<select>").attr("id", "item");
        item.append("<option value=''>--Item--</option>");
        item.append("<option value='sword' class='wep'>Swords</option>");
        item.append("<option value='bow' class='wep'>Bows</option>");
        item.append("<option value='staff' class='wep'>Staves</option>");
        item.append("<option value='helmet' class='arm'>Helmets</option>");
        item.append("<option value='plate' class='arm'>Breastplates</option>");
        item.append("<option value='glove' class='arm'>Gloves</option>");
        item.append("<option value='boot' class='arm'>Boots</option>");
        item.append("<option value='shield' class='arm'>Shields</option>");
        item.append("<option value='quiver' class='arm'>Quivers</option>");
        type.append(item);

        level = $("<input placeholder='Level' type='number'/>").attr("id", "level");
        type.append(level);

        filterButton = $("<input type='button' value='Filter'/>").attr("id", "armoryFilterButton");
        type.append(filterButton);
        return type;
    }

    function insertHtml(){
        filterDiv = $("<div>").attr("id","armoryFilter");
        filterDiv.append(createTypeSelect());
        var clanArmoryTable = $("#clanInventoryTable_filter");
        clanArmoryTable.after(filterDiv);
        clanArmoryTable.hide();
    };

    function setupWatches(){
        filterButton.on("click", function(){
            filterArmory(typeSelect.val(), item.val(), level.val());
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
            }else{
                showItems();
            }
        });
    };

    function hideWeapons(){
        item.children(".wep").hide();
    }

    function showWeapons(){
        item.children(".wep").show();
    }

    function hideArmor(){
        item.children(".arm").hide();
    }

    function showArmor(){
        item.children(".arm").show();
    }

    function showItems(){
        showArmor();
        showWeapons();
    }

    function filterArmory(type, item, level){
        console.log("Filtering Armory Selection for Type: " + type + ", Item: " + item + ", Level: " + level);
        //get table contents
        var tableRows = armoryTable.dataTable().api().rows().data();
        //hide rows that don't meet criteria
        tableRows.each(checkRow(index, element, type, item, level));
    }

    function checkRow(index, element, type, item, level){
        var x = 0;
    }

    function init() {
        console.log("In init()");
        insertHtml();
        setupWatches();
    };

    window.addEventListener('load', init, {once: true});

})(jQuery);
