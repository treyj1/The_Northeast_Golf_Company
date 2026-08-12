/* Valley Brook Golf Course — 2026 Master Plan
   Hole data extracted from "Valley Brook Individual Holes — DRAFT 5-19-2026".
   Loaded as a global so the site works opened directly from the filesystem. */

window.CATEGORIES = {
  tree:   { label: "Tree Management",        color: "#3f6b3a" },
  bunker: { label: "Bunker Renovation",      color: "#b08642" },
  tee:    { label: "Tee Adjustments",        color: "#7a6a3a" },
  pitch:  { label: "Short-Game Areas",       color: "#5e8c6a" },
  path:   { label: "Cart Path & Circulation",color: "#7d6f63" },
  flood:  { label: "Flood Resilience",       color: "#3b6ea5" },
  agro:   { label: "Fairway, Drainage & Agronomic", color: "#8a7b4f" }
};

window.TEES = [
  { id: "back",    label: "Back",    total: 6230 },
  { id: "middle",  label: "Middle",  total: 5700 },
  { id: "forward", label: "Forward", total: 4610 }
];

window.HOLES = [
  {
    n: 1, par: 4, yards: { back: 330, middle: 310, forward: 235 },
    notes: [
      { k: "A", c: ["tee"],    t: "Rebuilt four tees as two large tee surfaces to gain yardage flexibility." },
      { k: "B", c: ["tree"],   t: "Remove 6 cedars behind tee to improve airflow." },
      { k: "C", c: ["path"],   t: "Expand cart path circulation at the tee." },
      { k: "D", c: ["tree"],   t: "Remove all trees on the inside of the path (except large tree at 100 yards) to open playing corridor." },
      { k: "E", c: ["bunker"], t: "Rebuild / enhance bunkering." },
      { k: "F", c: ["tree"],   t: "Remove 4 trees behind green to open airflow. Develop fescue framing between 1 green and 2 tee." },
      { k: "G", c: ["pitch"],  t: "Develop pitch area to the left of the green." }
    ]
  },
  {
    n: 2, par: 5, yards: { back: 495, middle: 470, forward: 415 },
    notes: [
      { k: "A", c: ["tree"],   t: "Remove 6 trees inside the cart path to open playing corridor (1 maple, 1 pine, 2 oak, 2 cherry)." },
      { k: "B", c: ["tree"],   t: "Clean up trees / low brush at the right of the tee to open airflow and develop a vista down to Hole 13." },
      { k: "C", c: ["path"],   t: "Shift cart path to the left at the approach." },
      { k: "D", c: ["tree"],   t: "Remove multiple trees left of the green to open playable areas around the green." },
      { k: "E", c: ["bunker"], t: "Rebuild / enhance bunkering." }
    ]
  },
  {
    n: 3, par: 3, yards: { back: 195, middle: 150, forward: 105 },
    notes: [
      { k: "A", c: ["tee"],    t: "Expand tees to maximize surface area and flexibility." },
      { k: "B", c: ["bunker"], t: "Rebuild / enhance bunker styling and function." },
      { k: "C", c: ["pitch"],  t: "Develop pitch areas around the right and back of the green." },
      { k: "D", c: ["tree"],   t: "Remove 2 trees around the green (1 left and 1 behind green)." }
    ]
  },
  {
    n: 4, par: 4, yards: { back: 395, middle: 370, forward: 265 },
    notes: [
      { k: "A", c: ["tee"],    t: "Strip / level / expand back and forward tees." },
      { k: "B", c: ["tee"],    t: "Create new mid tee behind third green." },
      { k: "C", c: ["tree"],   t: "Remove first two trees and 3 trees at the approach inside the cart path." },
      { k: "D", c: ["tree"],   t: "Remove oak left of the fairway." },
      { k: "E", c: ["agro"],   t: "Expand fairway left." },
      { k: "F", c: ["bunker"], t: "Add strategic / directional fairway bunkering at the left corner." },
      { k: "G", c: ["tree"],   t: "Remove 2 oaks and 3 maples behind the green." },
      { k: "H", c: ["pitch"],  t: "Develop low-cut pitch areas all around the green to add variety." },
      { k: "I", c: ["agro"],   t: "Fill low areas and / or add drainage to improve conditions between cart paths at green." },
      { k: "J", c: ["path"],   t: "Cart path repairs right of the green." }
    ]
  },
  {
    n: 5, par: 5, yards: { back: 580, middle: 550, forward: 435 },
    notes: [
      { k: "A", c: ["tee"],    t: "Add middle tee at 480 yards." },
      { k: "B", c: ["tree"],   t: "Remove failing tree at the start of the fairway." },
      { k: "C", c: ["tree"],   t: "Remove 4 trees along the edge of the fairway to open playing corridor." },
      { k: "D", c: ["agro"],   t: "Add drainage at the first landing area." },
      { k: "E", c: ["tree"],   t: "Remove 4 trees along creek at 150 yards." },
      { k: "F", c: ["path"],   t: "Shift cart path near Hole 4 tee and widen approach to improve angle of play." },
      { k: "G", c: ["tree"],   t: "Remove 6 trees surrounding the green." },
      { k: "H", c: ["bunker"], t: "Rebuild / enhance bunkering." },
      { k: "I", c: ["agro"],   t: "Rebuild hollows into left slope." }
    ]
  },
  {
    n: 6, par: 4, yards: { back: 385, middle: 360, forward: 280 },
    notes: [
      { k: "A", c: ["tee"],          t: "Rebuild / level middle tee." },
      { k: "B", c: ["agro"],         t: "Reconstruct wall (structural / stabilize) at 6th tee." },
      { k: "C", c: ["tree"],         t: "Remove 5 trees at left past the bridge to open playing corridor and air circulation for turf health." },
      { k: "D", c: ["tree"],         t: "Remove 3 trees at left side of approach." },
      { k: "E", c: ["tree","path"],  t: "Remove 2 trees at right pinch point to widen playing corridor and shift path right." },
      { k: "F", c: ["bunker"],       t: "Rebuild / enhance fairway bunkering." },
      { k: "G", c: ["tree"],         t: "Remove 4 trees short left of the green." },
      { k: "H", c: ["bunker"],       t: "Rebuild / enhance greenside bunkering." },
      { k: "I", c: ["pitch"],        t: "Connect 6 and 8 green with a short-grass pitch area connection." }
    ]
  },
  {
    n: 7, par: 3, yards: { back: 225, middle: 180, forward: 110 },
    notes: [
      { k: "A", c: ["tee"],          t: "Add forward tee to add flexibility." },
      { k: "B", c: ["tree"],         t: "Remove 3 pines behind tees to improve turf conditions." },
      { k: "C", c: ["bunker","agro"],t: "Recontour fairway around bunkers to shift away from cart path." },
      { k: "D", c: ["bunker"],       t: "Rebuild / enhance greenside bunkering." },
      { k: "E", c: ["pitch"],        t: "Develop pitch area behind the green for added shot-making." },
      { k: "F", c: ["tree"],         t: "Remove 4+ pines behind the green to open airflow. Add fescue framing." },
      { k: "G", c: ["agro"],         t: "Clean all areas along pond edge at holes 7 and 8." }
    ]
  },
  {
    n: 8, par: 4, yards: { back: 420, middle: 390, forward: 320 },
    notes: [
      { k: "A", c: ["bunker"], t: "Rebuild / enhance fairway and greenside bunkering." },
      { k: "B", c: ["agro"],   t: "Adjust fairway mowing lines slightly to add visual movement to the hole." },
      { k: "C", c: ["pitch"],  t: "Develop pitch area at right and behind green, tied to Hole 6 surrounds." },
      { k: "D", c: ["tree"],   t: "Remove tree long and left of the green." }
    ]
  },
  {
    n: 9, par: 3, yards: { back: 175, middle: 145, forward: 90 },
    notes: [
      { k: "A", c: ["tee"],    t: "Construct new tee complex within the wooded area to the left of current tees." },
      { k: "B", c: ["tee"],    t: "Utilize existing tee material to build the new tee complex." },
      { k: "C", c: ["tree"],   t: "Remove two oaks in front of existing tees." },
      { k: "D", c: ["bunker"], t: "Rebuild / enhance greenside bunkering." },
      { k: "E", c: ["path"],   t: "Shift cart path to the left to open a new line of play." }
    ],
    extra: "The existing tees on Hole 9 pose a safety risk with the proximity of Hole 18. Repositioning the tees in the wooded area to the left of the existing cart path both mitigates this risk and opens the 18th hole for better playability."
  },
  {
    n: 10, par: 4, yards: { back: 320, middle: 280, forward: 230 },
    notes: [
      { k: "A", c: ["tree"],   t: "Remove all cedars at the tees of holes 10 and 1." },
      { k: "B", c: ["tee"],    t: "Expand mid and forward tees for added surface and length flexibility." },
      { k: "C", c: ["tee"],    t: "Expand forward tee / construct new tee at 230 yards." },
      { k: "D", c: ["agro"],   t: "Paint / general cleanup around all buildings to the right." },
      { k: "E", c: ["tree"],   t: "Remove all trees (13) inside the cart path." },
      { k: "F", c: ["path"],   t: "Reroute cart path to the right to eliminate crossing in front of the green." },
      { k: "G", c: ["pitch"],  t: "Expand fairway / pitch areas short and long of the green." },
      { k: "H", c: ["bunker"], t: "Rebuild / enhance greenside bunkering." }
    ]
  },
  {
    n: 11, par: 4, yards: { back: 315, middle: 290, forward: 260 },
    notes: [
      { k: "A", c: ["path"],   t: "Remove existing left cart path / use the right-most path." },
      { k: "B", c: ["agro"],   t: "Expand fairway in conjunction with cart path removal." },
      { k: "C", c: ["agro"],   t: "Cut down / manage cattails to establish visibility from the rear tees." },
      { k: "D", c: ["tree"],   t: "Remove 2 trees inside the cart path at 100 yards." },
      { k: "E", c: ["tree"],   t: "Establish fescue framing behind green for backdrop and separation." },
      { k: "F", c: ["tree"],   t: "Remove 2 pines inside cart path to right of green and back right of green." },
      { k: "G", c: ["bunker"], t: "Rebuild / enhance greenside and approach bunkering, including a new bunker back / left." },
      { k: "H", c: ["agro"],   t: "Remove stumps at left of approach." },
      { k: "I", c: ["pitch"],  t: "Expand pitch area around green." }
    ]
  },
  {
    n: 12, par: 3, yards: { back: 200, middle: 160, forward: 120 },
    notes: [
      { k: "A", c: ["tree"],   t: "Clear a row of trees to the right to improve airflow." },
      { k: "B", c: ["tee"],    t: "Level / expand middle tee." },
      { k: "C", c: ["path"],   t: "Cart path repairs." },
      { k: "D", c: ["bunker"], t: "Rebuild / enhance bunkering with a new back-left bunker." },
      { k: "E", c: ["agro"],   t: "Green surface repair at back left." },
      { k: "F", c: ["agro"],   t: "Restore green surrounds / add subsurface drainage." }
    ]
  },
  {
    n: 13, par: 5, yards: { back: 490, middle: 470, forward: 420 },
    flood: true,
    notes: [
      { k: "A", c: ["agro"],   t: "Remove stumps around the back tee." },
      { k: "B", c: ["tree"],   t: "Remove 10 trees inside and 9 trees outside the cart path at the start of the fairway." },
      { k: "C", c: ["flood"],  t: "Create a low area between the split fairway." },
      { k: "D", c: ["flood"],  t: "Raise portions of the fairway and install subsurface drainage." },
      { k: "E", c: ["tree"],   t: "Remove unhealthy trees at the river's edge." },
      { k: "F", c: ["tree"],   t: "Remove tree at left at 130 yards." },
      { k: "G", c: ["flood"],  t: "Rip-rap creek at bend points." },
      { k: "H", c: ["flood"],  t: "Rebuild / raise green complex above flood elevations." },
      { k: "I", c: ["flood"],  t: "Install force-main system moving floodwaters to the irrigation pond." }
    ]
  },
  {
    n: 14, par: 4, yards: { back: 335, middle: 320, forward: 290 },
    notes: [
      { k: "A", c: ["tree"],   t: "Remove 10–14 trees along right side to the creek." },
      { k: "B", c: ["tree"],   t: "Remove 15–20 trees at left side to open corridor of play and visibility to the landing area." },
      { k: "C", c: ["path"],   t: "Reroute cart path away from the center of the hole." },
      { k: "D", c: ["tree"],   t: "Remove 8–10 trees at approach to open line of play." },
      { k: "E", c: ["path"],   t: "Shift cart path left at green." },
      { k: "F", c: ["bunker"], t: "Add bunkering." },
      { k: "G", c: ["tree"],   t: "Develop fescue framing within the 14 / 15 triangle." }
    ]
  },
  {
    n: 15, par: 4, yards: { back: 395, middle: 360, forward: 305 },
    notes: [
      { k: "A", c: ["tee"],    t: "Strip / level / expand tees." },
      { k: "B", c: ["agro"],   t: "Adjust fairway perimeter for better light / airflow. Extend fairway toward the pond." },
      { k: "C", c: ["bunker"], t: "Rebuild / enhance bunkering." },
      { k: "D", c: ["pitch"],  t: "Develop pitch areas around green." },
      { k: "E", c: ["tree"],   t: "Fescue framing at hillside at left of path and behind green." }
    ]
  },
  {
    n: 16, par: 4, yards: { back: 440, middle: 400, forward: 350 },
    notes: [
      { k: "A", c: ["bunker"], t: "Rebuild / reposition left fairway bunker." },
      { k: "B", c: ["tree"],   t: "Remove 5 trees inside of cart path, potentially leaving one tree." },
      { k: "C", c: ["bunker"], t: "Add two new bunkers at right." },
      { k: "D", c: ["agro"],   t: "Widen fairway at right to run into the new bunkers." },
      { k: "E", c: ["bunker"], t: "Rebuild / enhance greenside bunkers." },
      { k: "F", c: ["agro"],   t: "Drainage / turf repairs front of right greenside bunker." },
      { k: "G", c: ["pitch"],  t: "New pitch area tied into 17 forward tee." }
    ]
  },
  {
    n: 17, par: 3, yards: { back: 175, middle: 160, forward: 95 },
    notes: [
      { k: "A", c: ["tee"],    t: "New forward tee tied into the pitch area behind 16 green." },
      { k: "B", c: ["tee"],    t: "Expand / level tees." },
      { k: "C", c: ["bunker"], t: "Rebuild greenside bunkers, including shortening the back bunker to accommodate the expanded pitch area." },
      { k: "D", c: ["pitch"],  t: "Expand pitch areas left and right of green." },
      { k: "E", c: ["pitch"],  t: "Tie expanded pitch area at right to 18 tee." }
    ]
  },
  {
    n: 18, par: 4, yards: { back: 360, middle: 335, forward: 285 },
    notes: [
      { k: "A", c: ["tree"],   t: "Remove 5 trees between 9 and 18 fairway; all except the last tree near the water." },
      { k: "B", c: ["tree"],   t: "Remove trees inside the cart path and 2 right of the path." },
      { k: "C", c: ["bunker"], t: "Rebuild / enhance / add greenside bunkers." },
      { k: "D", c: ["pitch"],  t: "Create a new pitch area at the back right of the green." },
      { k: "E", c: ["agro"],   t: "Option: rebuild green, expand, improve surface and intrigue." }
    ]
  }
];

window.HOLE13_NARRATIVE = {
  intro: "Hole 13 occupies the lowest ground on the property, running along the western edge of the course where the playing corridor meets Pascack Brook. The hole presents an ongoing challenge from stream flooding and bank erosion. Heavy rainfall overtops the banks of the brook and floods the fairway and green; ongoing erosion along the bank steadily narrows the corridor and threatens the long-term integrity of the hole.",
  fema: "This is the FEMA flood-hazard map for the Hole 13 corridor. The red-hatched zone is the regulatory floodway, the channel reserved for the active flow of floodwaters during a major event. The blue zone is the Special Flood Hazard Area, with a one-percent annual chance of flooding (the 100-year floodplain); the tan zone carries a 0.2-percent annual chance (the 500-year floodplain). Together, the three zones cover nearly the entire hole. The base flood elevations marked along the corridor, ranging from 27.0 feet at the green to 29.0 feet near the back of the fairway, are the elevations to which the brook is expected to rise in a 100-year event. Existing playing surfaces sit at or below these elevations through much of the corridor.",
  consequences: "The consequences are operational as well as agronomic. Flooding closes the back nine in the immediate aftermath of major storms. Recovery requires intensive post-flood repair, often including a temporary green to keep the hole in play while the primary green recovers. Turf conditions across the corridor remain compromised through long stretches of the playing season, even between major events. As the bank continues to erode, the playable width of the hole narrows year by year.",
  alternatives: "Two alternatives were evaluated before arriving at the proposed approach. Rerouting or redesigning the surrounding holes to abandon the corridor proved infeasible given wetland restrictions and the property's acreage constraints. Stabilizing the stream bank with sheet piling is cost-prohibitive and would not have resolved the underlying flooding; the closures, the temporary green, the post-flood repairs, and the compromised turf conditions would all have continued.",
  solution: "The proposed work addresses both the flooding and the bank erosion directly, while preserving the hole's existing corridor and strategic character. Within the corridor, the plan raises the fairway and green above flood elevation and introduces low-lying collection areas to manage water during smaller events. Subsurface drainage is installed across the corridor to evacuate residual water from the raised playing surfaces, and a force-main system carries floodwaters from the collection areas to the irrigation pond, where they can be stored and reused rather than allowed to stand on the hole. Erosion is mitigated through strategically placed rip-rap at the stream bend points where scour is most active.",
  result: "Together, these measures will keep Hole 13 playable through many of the storm events that currently force closure, and will dramatically reduce the time and expense of recovery following extreme weather. The hole's existing corridor, its strategic character, and its visual relationship to Pascack Brook are preserved — a more resilient hole that honors its existing design while performing reliably in conditions that have historically taken it out of play.",
};
