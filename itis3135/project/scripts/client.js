function openBook(tab,pageName){
    let i;
    let tabs;
    let bookTab;

    tabs=document.getElementsByClassName("tabs");
    for(i=0;i<tabs.length;i++){
      tabs[i].style.display="none";
    }
    bookTab=document.getElementsByClassName("bookTab");
    for(i=0;i<bookTab.length;i++){
      bookTab[i].className=bookTab[i].className.replace("active","");
    }
    document.getElementById(pageName).style.display="block";
    tab.currentTarget.className += "active";
    document.getElementById("Home").click();
  }