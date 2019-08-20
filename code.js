var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 250, height: 150 });
let cover = figma.createPage();
let frame = figma.createFrame();
let head = figma.createText();
let desc = figma.createText();
let setSpace = (node, spacex, spacey) => { node.relativeTransform = [[1, 0, spacex], [0, 1, spacey]]; };
let xCalculator = (container, element) => {
    return ((container.width / 2) - (element.width / 2));
};
let yCalculator = (container, element) => {
    return ((container.height / 2) - (element.height / 2));
};
let loadFontHead = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    head.characters = msg.name;
    head.fontSize = 74;
    head.fontName = { family: "Roboto", style: "Regular" };
    head.textAlignHorizontal = "CENTER";
});
let loadFontDesc = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    desc.fontSize = 36;
    desc.characters = msg.desc;
    let descX = xCalculator(frame, desc);
    let headX = xCalculator(frame, head);
    let headY = (yCalculator(frame, head) - 30);
    let descY = headY + head.height + 20;
    setSpace(head, headX, headY);
    setSpace(desc, descX, descY);
    head.textAlignHorizontal = "CENTER";
});
figma.ui.onmessage = msg => {
    frame.resize(1240, 640);
    loadFontHead(msg);
    loadFontDesc(msg);
    cover.name = "Cover";
    frame.name = "00";
    frame.appendChild(head);
    frame.appendChild(desc);
    cover.appendChild(frame);
    figma.root.insertChild(0, cover);
    figma.currentPage = cover;
    figma.closePlugin();
};
