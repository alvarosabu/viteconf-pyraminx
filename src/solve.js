/**
 * pyramid {
 *    colors -> { face: { position: Color }}
 *    getColor(face, position) -> Color
 *    getFromFacePosition(section, clockwise, face, position) -> [face, position]
 *    getFromColor(section, clockwise, face, position) -> Color
 *    rotateSection(section, clockwise)
 * }
 */

const faces = [ 
    'LRB', 'BUL', 'ULR', 'RBU' 
];
const positions = {
    LRB: [
        'L', 'R', 'B', // CENTER
        'Ll', 'Rr', 'Bb', // VERTICES
        'LR', 'RB', 'BL', // EDGES
    ],
    BUL: [
        'B', 'U', 'L', // CENTER
        'Bb', 'Uu', 'Ll', // VERTICES
        'BU', 'UL', 'LB', // EDGES
    ],
    ULR: [
        'U', 'L', 'R', // CENTER
        'Uu', 'Ll', 'Rr', // VERTICES
        'UL', 'LR', 'RU', // EDGES
    ],
    RBU: [
        'R', 'B', 'U', // CENTER
        'Rr', 'Bb', 'Uu', // VERTICES
        'RB', 'BU', 'UR', // EDGES
    ],
};
const colors = [ 
    'yellow', 'pink', 'green', 'purple' 
];
const sections = [
    'U', 'u', 'L', 'l', 'R', 'r', 'B', 'b' 
];

export function solve(pyramid) {
    if (pyramid.colors['LRB']['L'] === pyramid.getFromColor('l', true, 'LRB', 'Ll')) {
        // Rotate the Ll vertex if it will match the color of the LRB.L center 
        pyramid.rotateSection('l', true)
    }
    else {
        const section = sections[Math.floor(Math.random() * sections.length)];
        const clockwise = Math.random() > 1;
        pyramid.rotateSection(section, clockwise)
    }
}