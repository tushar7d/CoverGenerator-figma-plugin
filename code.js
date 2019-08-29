var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//creating figma UI
figma.showUI(__html__, { width: 300, height: 300 });
//creating elements 
let cover;
let frame;
let head;
let desc;
let stat;
let tagBg;
//  Positioning Functions 
let setPosition = (node, spacex, spacey) => { node.x = spacex, node.y = spacey; };
let xCalculator = (container, element) => {
    return ((container.width / 2) - (element.width / 2));
};
let yCalculator = (container, height) => {
    return (((container.height) - height) / 2);
};
let setColor = (node, color) => {
    function clone(val) {
        return JSON.parse(JSON.stringify(val));
    }
    let txtfills = clone(node.fills);
    txtfills[0].color = color;
    node.fills = txtfills;
};
//load Fonts
let loadFontHead = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Bold" });
    head.fontName = { family: "Roboto", style: "Bold" };
    head.characters = msg.name;
    head.fontSize = 74;
    head.textAlignHorizontal = "CENTER";
    head.resize(900, head.height);
});
let loadFontDesc = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    desc.fontSize = 36;
    desc.resize(800, desc.height);
    desc.characters = msg.desc;
});
let loadStat = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Bold" });
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
});
let setObjects = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield loadFontHead(msg);
    yield loadFontDesc(msg);
    yield loadStat(msg);
    let headX = xCalculator(frame, head);
    let descX = xCalculator(frame, desc);
    let statX = xCalculator(frame, stat);
    let tagBgX = xCalculator(frame, tagBg);
    let total = head.height + desc.height + stat.height + 75;
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
});
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    cover = figma.createPage();
    frame = figma.createFrame();
    head = figma.createText();
    desc = figma.createText();
    tagBg = figma.createRectangle();
    stat = figma.createText();
    cover.name = "Cover";
    frame.name = "00";
    frame.resize(1240, 640);
    figma.root.insertChild(0, cover);
    yield setObjects(msg);
    frame.appendChild(head);
    frame.appendChild(desc);
    frame.appendChild(tagBg);
    frame.appendChild(stat);
    cover.appendChild(frame);
    figma.currentPage = cover;
    figma.notify("Cover Generated");
    figma.closePlugin();
});
