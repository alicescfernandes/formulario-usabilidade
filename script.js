//Using hashbang because i can't have htaccess rewrite rules

//TODO: Better Erros
(function() {
  var totalForms = 3; //0-1
  var currentForm = 0;
  var prefix = "slide";
  var innerSlide = 1;
  var totalInnerSlides = 2;
  var dataLayer = new DataManager();

  function validateInput(input) {
    return input.checkValidity(); //TODO
  }

  //Virtual URL
  $(".virtual_link").click(function(e) {
    var firstInput = document.querySelector('.section-active .input'); //Encontrar uma maneira de ver qual input está ativo. se houver apenas um input, então selecionar esse

    if(firstInput) {
      var name = firstInput.getAttribute("name");
      var value = document.forms[currentForm][name].value;
      var currentInput = document.querySelector('.section-active .input'); //Encontrar uma maneira de ver qual input está ativo. se houver apenas um input, então selecionar esse
      var erro = document.querySelector(".section-active .input-error");
      e.preventDefault();
      if(validateInput(currentInput)) {
        erro.style.opacity = "0";
        history.pushState({},"",e.target.href);
        var question = document.querySelector(".section-active .question").innerText

        dataLayer.append(name,value,question.replace(),true);
        console.log(currentInput.label);
        dataLayer.show();
        updateView(e);

      } else {
        erro.style.opacity = "1";
        console.debug(currentInput.validity);
      }


    }
  });

  $(".inner-form-prev").click(function(e) {
    e.preventDefault();
    history.back();
  });

  function updateView(e) {
    let part = window.location.hash;
    part = window.location.hash
      .replace("#/","")
      .split("/")
      .filter(function(el) {
        return el != ""
      })

    if(part.length > 0 && part.length <= totalForms) {
      let form = $(`[data-form="${part[0]}"]`);
      currentForm = part[0] - 1;
      let top = form.offset().top || 0;


      $("html").animate({
        scrollTop: top
      },10);
      if(part.length == 2) {
        //Mostra a secçao

        $(".section-active").removeClass("section-active");
        $(`[data-section="${part[1]}"]`,form).addClass("section-active");
      } else {
        //Mostra sempre a primeira seccão
        $(".section-active").removeClass("section-active");
        $(`[data-section="1"]`,form).addClass("section-active");
      }
    } else {
      $(".section-active").removeClass("section-active");
      //If no section is included. Go to top
      //$("html, body").animate({ scrollTop: 0 },10);
    }
  }

  window.onpopstate = function(e) {
    updateView(e);
  };

  //Specific stuff
  $("[name='form1-q99']").on("input",function(e) {
    if(e.target.value == "Sim") {
      document.querySelector('label[for="input-text-12"]').style.display = "inline-block";
      document.querySelector("#input-text-12").removeAttribute("disabled");
      document.querySelector("#input-text-12").required = "true";
    } else {
      document.querySelector('label[for="input-text-12"]').style.display = "none";
      document.querySelector("#input-text-12").disabled = "true";
      document.querySelector("#input-text-12").removeAttribute("required");
    }

    document.querySelector("#input-text-12").removeAttribute("required");

  });

  $("[name='form1-q100']").on("input",function(e) {
    document.querySelector("#form1-q5-1").value = document.querySelector("#input-text-12").value;
  });


  $(".order-input").on("click",".arrow-top",function(e) {
    e = e.originalEvent;
    if(e.currentTarget.previousElementSibling) {
      e.currentTarget.previousElementSibling.insertAdjacentElement("beforebegin",e.currentTarget)
    }

    let values = Array.prototype.slice.call(document.querySelectorAll(".order-input"));
    values = values.map(function(e) {
      return e.getAttribute("data-value");
    })

    document.querySelector("#form1-q4-1").value = values.join(",");
    document.querySelector("#form1-q4-1").parentElement.innerHTML = values.join(",") + document.querySelector("#form1-q4-1").outerHTML;

  })

  $(".order-input").on("click",".arrow-bottom",function(e) {
    e = e.originalEvent
    if(e.currentTarget.nextElementSibling) {
      e.currentTarget.nextElementSibling.insertAdjacentElement("afterend",e.currentTarget)
    }

    let values = Array.prototype.slice.call(document.querySelectorAll(".order-input"))
    values = values.map(function(e) {
      return e.getAttribute("data-value");
    })

    document.querySelector("#input-hidden-1").value = JSON.stringify(values)


  })
})();