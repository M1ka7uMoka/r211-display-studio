// Photo-calibrated working values, not manufacturer specifications.
// Reference: R211 4064, LogicalRailfan, 2022-12-10, Wikimedia Commons.
export const R211_STYLE = {
 routeMatrix:{cols:32,rows:32,colorMode:'rgb'}, destinationMatrix:{cols:96,rows:28,colorMode:'white'},
 destinationGlyph:{width:8,height:12,letterSpacing:2,wordSpacing:6},
 routeBullet:{diameter:32,centerX:15.5,centerY:15.5},twoLineLayout:{topRow:1,bottomRow:16},
 led:{pitch:8,destinationPitchRatio:.70,diameterRatio:.68,brightness:1,glow:.12,edgeSoftness:.04},
 physical:{moduleGap:.35,padding:2},routeGlyph:{height:21,width:20,gap:2,clearance:.5}
};
