figma.showUI(__html__, { width: 250, height: 150 });

let cover = figma.createPage();
let frame = figma.createFrame();
let head = figma.createText();
let desc = figma.createText();

let setPosition = (node, spacex, spacey) => { node.relativeTransform = [[1, 0, spacex], [0, 1, spacey]] };

let xCalculator = (container: FrameNode, element: TextNode) => {
  return ((container.width / 2) - (element.width / 2));
}
let yCalculator = (container: FrameNode, element: TextNode) => {
  return ((container.height / 2) - (element.height / 2));
}

let loadFontHead = async (msg) => {
 
  await figma.loadFontAsync({ family: "Roboto", style: "Bold" });
  head.fontName = { family: "Roboto", style: "Bold" };
  head.characters = msg.name;
  head.fontSize = 74;
  head.textAlignHorizontal = "CENTER";

}



let loadFontDesc = async (msg) => {

  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  desc.fontSize = 36;
  desc.characters = msg.desc;
  
  let descX = xCalculator(frame, desc);
  let headX = xCalculator(frame, head);
  let headY = (yCalculator(frame, head) - 30);
  let descY = headY + head.height + 20;

  setPosition(head, headX, headY);
  setPosition(desc, descX, descY);

  head.textAlignHorizontal = "CENTER";

}


figma.ui.onmessage = async (msg) => {
  frame.resize(1240, 640);
 
  cover.name = "Cover";
  frame.name = "00"
  await loadFontHead(msg);
  await loadFontDesc(msg);

  frame.appendChild(head);
  frame.appendChild(desc);
  cover.appendChild(frame);
  figma.root.insertChild(0, cover)
  figma.currentPage = cover;
  figma.closePlugin();
  
}


