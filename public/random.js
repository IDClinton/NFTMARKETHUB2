// const menuBtn = document.querySelector(".menu-icon span");
//          const searchBtn = document.querySelector(".search-icon");
//          const cancelBtn = document.querySelector(".cancel-icon");
//          const items = document.querySelector(".nav-items");
//          const form = document.querySelector("form");
//          menuBtn.onclick = ()=>{
//            items.classList.add("active");
//            menuBtn.classList.add("hide");
//            searchBtn.classList.add("hide");
//            cancelBtn.classList.add("show");
//          };
//          cancelBtn.onclick = ()=>{
//            items.classList.remove("active");
//            menuBtn.classList.remove("hide");
//            searchBtn.classList.remove("hide");
//            cancelBtn.classList.remove("show");
//            form.classList.remove("active");
//            cancelBtn.style.color = "#ff3d00";
//          };
//          searchBtn.onclick = ()=>{
//            form.classList.add("active");
//            searchBtn.classList.add("hide");
//            cancelBtn.classList.add("show");
//          };


        var swiper = new Swiper(".home-slider", {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5500,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        loop:true,
        });
      
