
//creating figma UI
figma.showUI(__html__, { width: 300, height: 300 });

//creating elements 
let cover: PageNode;
let frame: FrameNode;
let head: TextNode;
let desc: TextNode;
let stat: TextNode;
let tagBg: RectangleNode;

//  Positioning Functions 
let setPosition = (node: TextNode| RectangleNode , spacex: number, spacey: number) => { node.x = spacex, node.y = spacey };

let xCalculator = (container: FrameNode, element: TextNode| RectangleNode) => {
  return ((container.width / 2) - (element.width / 2));
}
let yCalculator = (container: FrameNode, height: number) => {
  return (
    ((container.height) - height)/2
    );
}

//load Fonts


let loadFontHead = async (msg) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
  head.fontName = { family: "Roboto", style: "Bold" };
  head.characters = msg.name;
  head.fontSize = 74;
  head.textAlignHorizontal = "CENTER";
  head.resize(800, head.height);
}


let loadFontDesc = async (msg) => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  desc.fontSize = 36;
  desc.resize(800, desc.height);
  desc.characters = msg.desc;
}


let loadStat = async (msg) => {

  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
  stat.fontName = { family: "Roboto", style: "Regular" };
  stat.characters = msg.status;
  stat.fontSize = 24;
  stat.textAlignHorizontal = "CENTER";

  let tagBgWidth = stat.width + 30;
  let tagBgHeight = stat.height + 30; 

  tagBg.resize(tagBgWidth, tagBgHeight);
  tagBg.cornerRadius = 500;

  function clone(val) {
    return JSON.parse(JSON.stringify(val))
  }

  let txtfills = clone(stat.fills);
  txtfills[0].color = {r:1,g:1,b: 1}
  stat.fills = txtfills
  
  let Bgfills = clone(tagBg.fills);
  Bgfills[0].color = {r:0,g:90/255,b: 235/255}
  tagBg.fills = Bgfills

}



let setObjects = async (msg) => {
  await loadFontHead(msg);
  await loadFontDesc(msg);
  await loadStat(msg);

  
  let headX = xCalculator(frame, head);
  let descX = xCalculator(frame, desc);
  let statX = xCalculator(frame, stat);
  let tagBgX = xCalculator(frame, tagBg);

 

  let total:number = head.height+ desc.height + stat.height + 75

  let headY = (yCalculator(frame,total));
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

}


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
  figma.closePlugin();

}


