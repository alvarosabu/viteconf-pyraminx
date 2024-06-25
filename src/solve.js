// Can you do better than a random solver?
//
// pyramid.
//   colors -> { face: { position: Color }}
//   getColor(face, position) -> Color
//   getFromColor(section, clockwise, face, position) -> Color
//   getFromFacePosition(section, clockwise, face, position)
//     -> [face, position]
//   rotateSection(section, clockwise)

const positions = {
    //     CENTER           VERTICES            EDGES
    LRB: [ 'L', 'R', 'B',   'Ll', 'Rr', 'Bb',   'LR', 'RB', 'BL' ],
    BUL: [ 'B', 'U', 'L',   'Bb', 'Uu', 'Ll',   'BU', 'UL', 'LB' ],
    ULR: [ 'U', 'L', 'R',   'Uu', 'Ll', 'Rr',   'UL', 'LR', 'RU' ],
    RBU: [ 'R', 'B', 'U',   'Rr', 'Bb', 'Uu',   'RB', 'BU', 'UR' ],
  };
  const faces = [ 'LRB', 'BUL', 'ULR', 'RBU' ];
  const colors = [ 'yellow', 'pink', 'green', 'purple' ];
  const rotations = [ 'U', 'u', 'L', 'l', 'R', 'r', 'B', 'b' ];
  
  export function solve(pyramid) {
    const fromLlColor = pyramid.getFromColor('l', true, 'LRB', 'Ll')
    if (pyramid.colors['LRB']['L'] === fromLlColor) {
      // Rotate the Ll vertex if it matches the color of the LRB.L center 
      pyramid.rotateSection('l', true)
    }
    else {
      const section = rotations[
        Math.floor(Math.random() * rotations.length)
      ];
      const clockwise = Math.random() > 0.5;
      pyramid.rotateSection(section, clockwise)
    }
  }