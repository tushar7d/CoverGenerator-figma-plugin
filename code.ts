figma.showUI(__html__, { width: 250, height: 150 });

figma.ui.onmessage = msg => {
  let cover = figma.createPage();
  let frame = figma.createFrame();
  let head = figma.createText();
  let desc = figma.createText();

  let setSpace = (node, spacex, spacey) => { node.relativeTransform = [[1, 0, spacex], [0, 1, spacey]] };

  let loadFont = async () => {
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
     
    head.fontSize = 64;
    desc.fontSize = 36;
    head.characters = msg.name;
    desc.characters = msg.desc;
    let cnt = (frame.width/2 )- (desc.width/2);
    let bnt = (frame.width/2 )- (head.width/2);
    setSpace(head, bnt, 123);
    setSpace(desc, cnt, 236);
    head.textAlignHorizontal = "CENTER";
    desc.textAlignHorizontal = "CENTER";
  }
  cover.name = "Cover";


  frame.resize(836, 400);
  frame.name = "00"
  frame.appendChild(head);
  frame.appendChild(desc);
  loadFont()
  frame.appendChild(head);
  cover.appendChild(frame);
  frame.appendChild(head);
  figma.root.insertChild(0, cover)
  figma.currentPage = cover;

  figma.closePlugin();

}


