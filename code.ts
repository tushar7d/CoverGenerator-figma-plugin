
//creating figma UI

let data = figma.root;




//creating elements 
let cover: PageNode;
let frame: FrameNode;
let head: TextNode;
let desc: TextNode;
let stat: TextNode;
let tagBg: RectangleNode;

//  Positioning Functions 
let setPosition = (node: TextNode | RectangleNode, spacex: number, spacey: number) => { node.x = spacex, node.y = spacey };

let xCalculator = (container: FrameNode, element: TextNode | RectangleNode) => {
  return ((container.width / 2) - (element.width / 2));
}
let yCalculator = (container: FrameNode, height: number) => {
  return (
    ((container.height) - height) / 2
  );
}
//  Color Functions 
let setColor = (node: TextNode | RectangleNode, color) => {
  function clone(val) {
    return JSON.parse(JSON.stringify(val))
  }


  let txtfills = clone(node.fills);
  txtfills[0].color = color;
  node.fills = txtfills
}



//load Elements


let loadFontHead = async (msg) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
  head.fontName = { family: "Roboto", style: "Bold" };
  head.characters = msg.name;
  head.fontSize = 74;
  head.textAlignHorizontal = "CENTER";
  head.resize(900, head.height);
}


let loadFontDesc = async (msg) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  desc.fontSize = 36;
  desc.resize(800, desc.height);
  desc.characters = msg.desc;
}


let loadStat = async (msg) => {

  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  stat.fontName = { family: "Roboto", style: "Regular" };
  stat.characters = msg.status;
  stat.fontSize = 24;
  stat.textAlignHorizontal = "CENTER";

  let tagBgWidth = stat.width + 30;
  let tagBgHeight = stat.height + 30;

  tagBg.resize(tagBgWidth, tagBgHeight);
  tagBg.cornerRadius = 500;


  setColor(stat, { r: 1, g: 1, b: 1 });
  setColor(tagBg, { r: 0, g: 90 / 255, b: 235 / 255 });


}


// Layout things

let setObjects = async (msg) => {
  await loadFontHead(msg);
  await loadFontDesc(msg);
  await loadStat(msg);


  let headX = xCalculator(frame, head);
  let descX = xCalculator(frame, desc);
  let statX = xCalculator(frame, stat);
  let tagBgX = xCalculator(frame, tagBg);
  



  let total: number = head.height + desc.height + stat.height + 75

  let headY = (yCalculator(frame, total));
  let descY = headY + head.height + 20;
  let statY = descY + desc.height + 40;
  let tagBgY = statY - 15;

  setPosition(head, headX, headY);
  setPosition(desc, descX, descY);
  setPosition(stat, statX, statY);
  setPosition(tagBg, tagBgX, tagBgY);

  head.textAlignHorizontal = "CENTER";
  desc.textAlignHorizontal = "CENTER";
  stat.textAlignHorizontal = "CENTER";

  stat.name = "status";
  tagBg.name = "statbg";

}

// on user action do the following

if (figma.root.getPluginData("flag") != "1") 
{
  figma.showUI(__html__, { width: 300, height: 300 });

  console.log(figma.root.getPluginData("flag"));
  console.log("hello")
  figma.ui.onmessage = async (msg) => {

    cover = figma.createPage();
    frame = figma.createFrame();
    head = figma.createText();
    desc = figma.createText();
    tagBg = figma.createRectangle();
    stat = figma.createText();

    cover.name = "Cover";
    frame.name = "00"
    frame.resize(1240, 640);
    figma.root.insertChild(0, cover);


    await setObjects(msg);


    frame.appendChild(head);
    frame.appendChild(desc);
    frame.appendChild(tagBg);
    frame.appendChild(stat);

    cover.appendChild(frame);

    figma.currentPage = cover;

    figma.notify("Cover Generated")

    figma.root.setPluginData('flag', "1");
    figma.root.setPluginData('Name', msg.name);
    figma.root.setPluginData('Description', msg.desc);
    figma.root.setPluginData('Description', msg.status);

    figma.closePlugin();
  }
}
else {
  console.log("closing plugin")
  figma.showUI(__html__, { width: 300, height: 300 });
  figma.ui.postMessage(true);

  figma.ui.onmessage = async (msg) => {

  let Page = figma.root.findOne(n => n.name === "Cover");
    
  figma.currentPage = Page as PageNode;
    let Text =  figma.currentPage.findOne(n=>n.name === "status");
    let txt = Text as TextNode;
    let Bg = figma.currentPage.findOne(n=>n.name === "statbg");
    let bg = Bg as RectangleNode;
    let Fm = figma.currentPage.findOne(n=>n.name === "00");
    let fm = Fm as FrameNode;
    await SetText(txt, msg, bg,fm);
    figma.notify("Cover Updated")

    figma.closePlugin();

  }
}
let SetText = async(txt, msg,bg,fm )=>{
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  txt.characters = msg.status;

  let tagBgWidth = txt.width + 30;
  let tagBgHeight = txt.height + 30;

  bg.resize(tagBgWidth, tagBgHeight);

  let statX = xCalculator(fm, txt);
  let tagBgX = xCalculator(fm, bg);
  setPosition(txt, statX, txt.y);
  setPosition(bg, tagBgX, bg.y);

}






