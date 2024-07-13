import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

function TrackBox({ label, index, value, setValue }) {
	function handleClick() {
		if (value === index) {
			setValue(index-1);
		} else {
			setValue(index);
		}
	}
	
	return (
		<button class={value < index ? "trackBoxOpen" : "trackBoxFill"} onClick={handleClick}></button>
	);
}

function Track({ label, size, value, setValue }) {
	const boxes = [];
	for (let i = 0; i < size; i++) {
		let box_id = "track_"+label+"_"+(i+1);
		boxes.push(
			<TrackBox id={box_id} label={label} index={i+1} value={value} setValue={setValue} />
		);
	}
	return (
		<>
			{boxes}
		</>
	);
}

function LabelTracker({ label, track }) {
	let track_id = "track_"+label
	return (
		<tr>
			<td>{label}</td>
			<td><Track id={track_id} label={label} size={track.maxValue} value={track.value} setValue={track.setValue} /></td>
		</tr>
	);
}

function ActionRating({ action }) {
	return (
		<tr>
			<td>{action.name}</td>
			<td>{action.value} of 4</td>
		</tr>
	);
}

function AttributeBlock({ attribute }) {
	const rows = [];
	attribute.actions.forEach((action) => {
		rows.push(
			<ActionRating action={action} />
		);
	});

	return (
		<table>
			<thead><LabelTracker label={attribute.name} track={attribute.xp_track} /></thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function CharacterDetails({ characterDetails }) {
	return (
	  <table>
			<thead></thead>
			<tbody>
				<tr>
					<td>Name:</td>
					<td>{characterDetails.name}</td>
				</tr>
				<tr>
					<td>Alias:</td>
					<td>{characterDetails.alias}</td>
				</tr>
				<tr>
					<td>Look:</td>
					<td>{characterDetails.look.gender}, {characterDetails.look.traits}, {characterDetails.look.clothes}</td>
				</tr>
				<tr>
					<td>Heritage:</td>
					<td>{characterDetails.heritage}</td>
				</tr>
				<tr>
					<td>Background:</td>
					<td>{characterDetails.background}</td>
				</tr>
				<tr>
					<td>Vice:</td>
					<td>{characterDetails.vice}</td>
				</tr>
				<tr>
					<td>Vice Purveyor:</td>
					<td>{characterDetails.vicePurveyor}</td>
				</tr>
				<tr>
					<td>Ally:</td>
					<td>{characterDetails.ally}</td>
				</tr>
				<tr>
					<td>Nemesis:</td>
					<td>{characterDetails.nemesis}</td>
				</tr>
				<br/>
				<tr>
					<td>Playbook:</td>
					<td>{characterDetails.playbook}</td>
				</tr>
				<tr>
					<LabelTracker label="Coin" track={characterDetails.coin} />
				</tr>
				<tr>
					<td>Stash:</td>
					<td>{characterDetails.stash}</td>
				</tr>
			</tbody>
		</table>
	);
}

function XPTriggerList({ playbook }) {
	return (
		<details>
			<summary>{playbook} XP triggers:</summary>
			<p>
				You addressed a challenge with {XP_TRIGGERS[playbook.toLowerCase()]}.<br/>
				You expressed your beliefs, drives, heritage, or background.<br/>
				You struggled with issues from your vice or traumas during the session.
			</p>
		</details>
	);
}

function StressTracker({ stressInfo }) {
	return (
		<LabelTracker label="Stress" track={stressInfo} />
	);
}

function TraumaTracker({ traumaList }) {
	const traumaInfo = {
		value: traumaList.length,
		setValue: () => {},
		maxValue: 4
	}
	return (
		<>
			<LabelTracker label="Trauma" track={traumaInfo} />
				{traumaList}
		</>
	);
}

function HarmTable({ harm }) {
	const [edit, setEdit] = useState(false)
	
	return (
		<>
			<table>
				<thead>
					<tr>
						<td>Harm</td>
						<td/>
						<td/>
						<td>
							<button onClick={() => setEdit(!edit)} type="button" className="btn btn-primary">
								{edit ? "Lock Harm" : "Edit Harm"}
							</button>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>3</td>
						<td><input type="text" disabled={!edit} readOnly={edit} value={harm.lvl_3a} placeholder="" onChange={(e) => harm.setLvl_3a(e.target.value)} /></td>
						<td/>
						<td>Need Help</td>
					</tr>
					<tr>
						<td>2</td>
						<td><input type="text" disabled={!edit} readOnly={edit} value={harm.lvl_2a} placeholder="" onChange={(e) => harm.setLvl_2a(e.target.value)} /></td>
						<td><input type="text" disabled={!edit} readOnly={edit} value={harm.lvl_2b} placeholder="" onChange={(e) => harm.setLvl_2b(e.target.value)} /></td>
						<td>-1d</td>
					</tr>
					<tr>
						<td>1</td>
						<td><input type="text" disabled={!edit} readOnly={edit} value={harm.lvl_1a} placeholder="" onChange={(e) => harm.setLvl_1a(e.target.value)} /></td>
						<td><input type="text" disabled={!edit} readOnly={edit} value={harm.lvl_1b} placeholder="" onChange={(e) => harm.setLvl_1b(e.target.value)} /></td>
						<td>Less Effect</td>
					</tr>
				</tbody>
			</table>
			
		</>
	);
}

function HealingClock({ healing, setHealing }) {
	const healingInfo = {
		value: healing,
		setValue: setHealing,
		maxValue: 4
	}
	return (
		<LabelTracker label="Healing Clock" track={healingInfo} />
	);
}

function ArmorUse({ armor }) {
	return (
		<div>
			<input type="checkbox" id={armor.name} checked={armor.used} onChange={(e) => armor.setUsed(e.target.checked)} />
			<label for={armor.name}>{armor.name}</label>
		</div>
	);
}

function ArmorUses({ armorUses }) {
	const rows = [];
	armorUses.forEach((armor) => {
		rows.push(
			<ArmorUse armor={armor} />
		);
	});
	
	return (
		<div>
			Armor:
			{rows}
		</div>
	);
}

function LoadDisplay({ load, setLoad, playbook, inventory }) {
	const loadLimits = {
		light: 3,
		medium: 5,
		heavy: 7
	}
	
	let loadCurrent = 0;
	Object.entries(GENERAL_ITEMS).forEach(([key, item]) => {
		if (inventory.includes(item.name)) {
			loadCurrent += item.cost;
		}
	});
	Object.entries(PLAYBOOK_ITEMS[playbook.toLowerCase()]).forEach(([key, item]) => {
		if (inventory.includes(item.name)) {
			loadCurrent += item.cost;
		}
	});
	
	return (
		<>
			Load: <LoadSelector load={load} setLoad={setLoad} />
			<br/>
			used {loadCurrent} of {loadLimits[load.toLowerCase()]}
		</>
	);
}

function LoadSelector({ load, setLoad }) {
	const handleChange = (event) => {
		setLoad(event.target.value);
	};
	
	return (
		<select value={load} onChange={handleChange}>
			<option value="Light">Light</option>
			<option value="Medium">Medium</option>
			<option value="Heavy">Heavy</option>
		</select>
	);
}

function ItemCheckbox({ item, inventory, setInventory }) {
	const itemUsed = inventory.includes(item.name);
	const linkedBoxes = [];
	for (let i = 0; i < item.cost; i++) {
		linkedBoxes.push(
		  <input type="checkbox" checked={itemUsed} onChange={handleChange} />
		);
	};
	
	function handleChange(e) {
		if (e.target.checked) {
			setInventory([
				...inventory,
				item.name
			]);
		} else {
			setInventory(inventory.filter(a => a !== item.name));
		}
	}
	
	const itemLabel = [];
	
	if (item.cost < 1) {
		linkedBoxes.push(
		  <input type="checkbox" checked={itemUsed} onChange={handleChange} />
		);
		itemLabel.push(
			<i>{item.name}</i>
		);
	} else {
		itemLabel.push(
			<>{item.name}</>
		);
	}
	
	return (
		<>
			{linkedBoxes}
			{itemLabel}
		</>
	);
}

function ItemList({ label, inventory, setInventory, itemSource }) {
	const itemBoxes = [];	
	Object.entries(itemSource).forEach(([key, item]) => {
		itemBoxes.push(
			<>
				<ItemCheckbox item={item} inventory={inventory} setInventory={setInventory} />
				<br/>
			</>
		);
	});
	
	return (
		<details>
			<summary>{label}:</summary>
			<p>{itemBoxes}</p>
		</details>
	);
}

function AbilityEntry({ name, description }) {
	return (
		<>
			<b>{name}:</b> {description}
		</>
	);
}

function AbilityList({ abilityList }) {
	const rows = [];
	abilityList.forEach((ability) => {
		let abilityInfo = SPECIAL_ABILITIES[ability]
		rows.push(
			<AbilityEntry name={abilityInfo.name} description={abilityInfo.description} />
		);
	});
	
	return (
		<>
			{rows}
		</>
	);
}

function CharacterSheet({ characterInfo }) {
	const [name, setName] = useState("");
	const [alias, setAlias] = useState("");
	const [gender, setGender] = useState("");
	const [traits, setTraits] = useState("");
	const [clothes, setClothes] = useState("");
	const [heritage, setHeritage] = useState("");
	const [background, setBackground] = useState("");
	const [vice, setVice] = useState("");
	const [vicePurveyor, setVicePurveyor] = useState("");
	const [ally, setAlly] = useState("");
	const [nemesis, setNemesis] = useState("");
	const [playbook, setPlaybook] = useState("Cutter");
	const [coin, setCoin] = useState(0);
	const [stash, setStash] = useState(0);
	const [stress, setStress] = useState(0);
	const [maxStress, setMaxStress] = useState(9);
	const [trauma, setTrauma] = useState([]);
	const [harm1a, setHarm1a] = useState("");
	const [harm1b, setHarm1b] = useState("");
	const [harm2a, setHarm2a] = useState("");
	const [harm2b, setHarm2b] = useState("");
	const [harm3a, setHarm3a] = useState("");
	const [healing, setHealing] = useState(0);
	const [armorNormal, setArmorNormal] = useState(false);
	const [armorHeavy, setArmorHeavy] = useState(false);
	const [armorSpecial, setArmorSpecial] = useState(false);
	const [insightXP, setInsightXP] = useState(0);
	const [prowessXP, setProwessXP] = useState(0);
	const [resolveXP, setResolveXP] = useState(0);
	const [playbookXP, setPlaybokXP] = useState(0);
	const [hunt, setHunt] = useState(0);
	const [study, setStudy] = useState(0);
	const [survey, setSurvey] = useState(0);
	const [tinker, setTinker] = useState(0);
	const [finesse, setFinesse] = useState(0);
	const [prowl, setProwl] = useState(0);
	const [skirmish, setSkirmish] = useState(0);
	const [wreck, setWreck] = useState(0);
	const [attune, setAttune] = useState(0);
	const [command, setCommand] = useState(0);
	const [consort, setConsort] = useState(0);
	const [sway, setSway] = useState(0);
	const [load, setLoad] = useState("Light");
	const [itemsUsed, setItemsUsed] = useState([]);
	const [specialAbilities, setSpecialAbilities] = useState([]);
	
	const attributes = [
	  {
			name: "Insight",
			actions: [
				{name: "Hunt", value: hunt},
				{name: "Study", value: study},
				{name: "Survey", value: survey},
				{name: "Tinker", value: tinker}
			],
			xp_track: {
				value: insightXP,
				setValue: setInsightXP,
				maxValue: 6
			}
		},
		{
			name: "Prowess",
			actions: [
				{name: "Finesse", value: finesse},
				{name: "Skirmish", value: skirmish},
				{name: "Prowl", value: prowl},
				{name: "Wreck", value: wreck}
			],
			xp_track: {
				value: prowessXP,
				setValue: setProwessXP,
				maxValue: 6
			}
		},
		{
			name: "Resolve",
			actions: [
				{name: "Attune", value: attune},
				{name: "Command", value: command},
				{name: "Consort", value: consort},
				{name: "Sway", value: sway}
			],
			xp_track: {
				value: resolveXP,
				setValue: setResolveXP,
				maxValue: 6
			}
		}
	]
	
	const details = {
		name: name,
		alias: alias,
		look: {
			gender: gender,
			traits: traits,
			clothes: clothes
		},
		heritage: heritage,
		background: background,
		vice: vice,
		vicePurveyor: vicePurveyor,
		ally: ally,
		nemesis: nemesis,
		playbook: playbook,
		coin: {
			value: coin,
			setValue: setCoin,
			maxValue: 4
		},
		stash: stash
	}
	
	const stressInfo = {
		value: stress,
		setValue: setStress,
		maxValue: maxStress
	}
	
	const harm = {
		lvl_1a: harm1a,
		setLvl_1a: setHarm1a,
		lvl_1b: harm1b,
		setLvl_1b: setHarm1b,
		lvl_2a: harm2a,
		setLvl_2a: setHarm2a,
		lvl_2b: harm2b,
		setLvl_2b: setHarm2b,
		lvl_3a: harm3a,
		setLvl_3a: setHarm3a
	}
	
	const armor = [
		{name: "armor", used: armorNormal, setUsed: setArmorNormal},
		{name: "heavy", used: armorHeavy, setUsed: setArmorHeavy},
		{name: "special", used: armorSpecial, setUsed: setArmorSpecial}
	]
	
	const playbookXPInfo = {
		value: playbookXP,
		setValue: setPlaybokXP,
		maxValue: 8
	}
	
	const attributeBlocks = [];
	attributes.forEach((attribute) => {
		attributeBlocks.push(
			<>
				<AttributeBlock attribute={attribute} />
				<br/>
			</>
		);
	});
	
	const playbookItems = PLAYBOOK_ITEMS[playbook.toLowerCase()];
	
	return (
		<div>
			<CharacterDetails characterDetails={details} />
			<br/>
			<LabelTracker label="Playbook XP" track={playbookXPInfo} />
			<br/>
			<StressTracker stressInfo={stressInfo} />
			<TraumaTracker traumaList={trauma} />
			<br/>
			<HarmTable harm={harm} />
			<br/>
			<HealingClock healing={healing} setHealing={setHealing} />
			<br/>
			<ArmorUses armorUses={armor} />
			<br/>
			{attributeBlocks}
			<br/>
			<LoadDisplay load={load} setLoad={setLoad} playbook={playbook} inventory={itemsUsed} />
			<br/> 
			<br/>
			<ItemList label="Items" inventory={itemsUsed} setInventory={setItemsUsed} itemSource={GENERAL_ITEMS} />
			<br/>
			<ItemList label="Playbook Items" inventory={itemsUsed} setInventory={setItemsUsed} itemSource={playbookItems} />
			<br/>
			Special Abilities:
			<br/>
			<AbilityList abilityList={specialAbilities} />
			<br/>
			<br/>
			<XPTriggerList playbook={playbook} />
		</div>
	);
}

function App() {
	return (
	  <>
			<CharacterSheet characterInfo={SHEET} />
			<br/>
		</>
	);
}


const SHEET = {
	details: {
		name: "Tiffany Bellbottom",
		alias: "So-and-so",
		look: {
			gender: "Woman",
			traits: "todo: traits?",
			clothes: "todo: clothes?"
		},
		heritage: "Akorosi",
		background: "Labor",
		vice: "Luxury",
		vicePurveyor: "The mall",
		ally: "What's-her-face",
		nemesis: "Tomkins",
		playbook: "Slide",
		coin: 3,
		stash: 12
	},
	stress: {
		value: 3,
		maxValue: 9
	},
	trauma: [
	  "unstable"
	],
	harm: {
		lvl_1a: "",
		lvl_1b: "",
		lvl_2a: "",
		lvl_2b: "Arrowed",
		lvl_3a: ""
	},
	healing: 2,
	armor: [
		{name: "armor", used: false},
		{name: "heavy", used: false},
		{name: "special", used: true}
	],
	attributes: [
	  {
			name: "Insight",
			actions: [
				{name: "Hunt", value: 2},
				{name: "Study", value: 0},
				{name: "Survey", value: 0},
				{name: "Tinker", value: 1}
			],
			xp_track: {
				value: 2,
				maxValue: 6
			}
		},
		{
			name: "Prowess",
			actions: [
				{name: "Finesse", value: 2},
				{name: "Skirmish", value: 0},
				{name: "Prowl", value: 0},
				{name: "Wreck", value: 1}
			],
			xp_track: {
				value: 2,
				maxValue: 6
			}
		},
		{
			name: "Resolve",
			actions: [
				{name: "Attune", value: 2},
				{name: "Command", value: 0},
				{name: "Consort", value: 0},
				{name: "Sway", value: 1}
			],
			xp_track: {
				value: 2,
				maxValue: 6
			}
		}
	],
	playbook_xp: {
		value: 4,
		maxValue: 8
	},
	load: "Light",
	itemsUsed: [
	  "Documents",
		"Climbing Gear"
	],
	specialAbilities: [
		"slideSubterfuge"
	]
}

const ATTRIBUTE_ACTIONS = {
	insight: [
		"hunt",
		"study",
		"survey",
		"tinker"
	],
	prowess: [
		"finesse",
		"prowess",
		"skirmish",
		"wreck"
	],
	resolve: [
		"attune",
		"command",
		"consort",
		"sway"
	]
}

const GENERAL_ITEMS = {
	blades: {
		name: "A Blade or Two",
		cost: 1
	},
	knives: {
		name: "Throwing Knives",
		cost: 1
	},
	pistol: {
		name: "A Pistol",
		cost: 1
	},
	pistol2: {
		name: "A 2nd Pistol",
		cost: 1
	},
	weaponLg: {
		name: "A Large Weapon",
		cost: 2
	},
	weaponUn: {
		name: "An Unusual Weapon",
		cost: 1
	},
	armor: {
		name: "Armor",
		cost: 2
	},
	armorHv: {
		name: "+Heavy",
		cost: 3
	},
	gearBurg: {
		name: "Burglary Gear",
		cost: 1
	},
	gearClmb: {
		name: "Climbing Gear",
		cost: 2
	},
	implement: {
		name: "Arcane Implements",
		cost: 1
	},
	documents: {
		name: "Documents",
		cost: 1
	},
	subterfuge: {
		name: "Subterfuge Supplies",
		cost: 1
	},
	toolsDemo: {
		name: "Demolition Tools",
		cost: 2
	},
	toolsTink: {
		name: "Tinkering Tools",
		cost: 1
	},
	lantern: {
		name: "Lantern",
		cost: 1
	}
}

const PLAYBOOK_ITEMS = {
	cutter: {
		weaponSmF: {
			name: "Fine Hand Weapon",
			cost: 1
		},
		weaponLgF: {
			name: "Fine Heavy Weapon",
			cost: 2
		},
		weaponSc: {
			name: "Scary Weapon or Tool",
			cost: 1
		},
		manacles: {
			name: "Manacles and Chain",
			cost: 0
		},
		rageVial: {
			name: "Rage Essence Vial",
			cost: 0
		},
		spiritbane: {
			name: "Spiritbane Charm",
			cost: 0
		},
	},
	hound: {
		pistolPairF: {
			name: "Fine Pair of Pistols",
			cost: 1
		},
		rifleF: {
			name: "Fine Long Rifle",
			cost: 2
		},
		electroAmmo: {
			name: "Electroplasmic Ammunition",
			cost: 1
		},
		huntingPet: {
			name: "A Trained Hunting Pet",
			cost: 0
		},
		spyglass: {
			name: "Spyglass",
			cost: 1
		},
		spiritbane: {
			name: "Spiritbane Charm",
			cost: 0
		},
	},
	leech: {
		toolsTinkF: {
			name: "Fine Tinkering Tools",
			cost: 1
		},
		toolsDemoF: {
			name: "Fine Wrecking Tools",
			cost: 2
		},
		blowgun: {
			name: "Blowgun and Darts, Syringes",
			cost: 0
		},
		bandolier1: {
			name: "Bandolier (3 uses)",
			cost: 1
		},
		bandolier2: {
			name: "Bandolier (3 uses)",
			cost: 1
		},
		gadget1: {
			name: "Gadget",
			cost: 1
		},
		gadget2: {
			name: "Gadget",
			cost: 1
		},
		gadget3: {
			name: "Gadget",
			cost: 1
		},
	},
	lurk: {
		lockpicksF: {
			name: "Fine Lockpicks",
			cost: 0
		},
		cloakF: {
			name: "Fine Shadow Cloak",
			cost: 1
		},
		gearClmbLt: {
			name: "Light Climbing Gear",
			cost: 1
		},
		silenceVial: {
			name: "Silence Potion Vial",
			cost: 0
		},
		darksightVial: {
			name: "Dark-sight Potion Vial",
			cost: 1
		},
		spiritbane: {
			name: "Spiritbane Charm",
			cost: 0
		},
	},
	slide: {
		clothesF: {
			name: "Fine Clothes and Jewelry",
			cost: 0
		},
		disguiseF: {
			name: "Fine Disguise Kit",
			cost: 1
		},
		diceF: {
			name: "Fine Loaded Dice, Trick Cards",
			cost: 0
		},
		trancePowd: {
			name: "Trance Powder",
			cost: 0
		},
		caneSword: {
			name: "A Cane-sword",
			cost: 1
		},
		spiritbane: {
			name: "Spiritbane Charm",
			cost: 0
		},
	},
	spider: {
		coverIdF: {
			name: "Fine Cover Identity",
			cost: 0
		},
		whiskeyF: {
			name: "Fine Bottle of Whiskey",
			cost: 1
		},
		blueprints: {
			name: "Blueprints",
			cost: 1
		},
		slumberVial: {
			name: "Vial of Slumber Essence",
			cost: 0
		},
		pistolPalm: {
			name: "Concealed Palm Pistol",
			cost: 0
		},
		spiritbane: {
			name: "Spiritbane Charm",
			cost: 0
		},
	},
	whisper: {
		lightHookF: {
			name: "Fine Lightning Hook",
			cost: 2
		},
		spiritMaskF: {
			name: "Fine Spirit Mask",
			cost: 1
		},
		electroVial: {
			name: "Electroplasm Vials",
			cost: 0
		},
		spiritBot: {
			name: "Spirit Bottles (2)",
			cost: 1
		},
		ghostKey: {
			name: "Ghost Key",
			cost: 0
		},
		demonbane: {
			name: "Demonbane Charm",
			cost: 0
		},
	}
}

const SPECIAL_ABILITIES = {
	slideRook: {
		id: "slideRook",
		name: "Rook's Gambit",
		description: "Take 2 stress to roll your best action rating while performing a different action. Say how you adapt your skill to this use.",
		playbook: "slide"
	},
	slideCloak: {
		id: "slideCloak",
		name: "Cloak and Dagger",
		description: "When you use a disguise or other form of covert misdirection, you get +1d to rolls to confuse or deflect suspicion. When you throw off your disguise, the resulting surprise gives you the initiative in the situation.",
		playbook: "slide"
	},
	slideGhost: {
		id: "slideGhost",
		name: "Ghost Voice",
		description: "You know the secret method to interact with a ghost or demon as if it were a normal human, regardless of how wild or feral it appears. You gain potency when communicating with the supernatural.",
		playbook: "slide"
	},
	slideMirror: {
		id: "slideMirror",
		name: "Like Looking in the Mirror",
		description: "You can always tell when someone is lying to you.",
		playbook: "slide"
	},
	slideSide: {
		id: "slideSide",
		name: "A Little Something on the Side",
		description: "At the end of each downtime phase, you earn +2 stash.",
		playbook: "slide"
	},
	slideMesmerism: {
		id: "slideMesmerism",
		name: "Mesmerism",
		description: "When you Sway someone, you may cause them to forget that it's happened until they next interact with you.",
		playbook: "slide"
	},
	slideSubterfuge: {
		id: "slideSubterfuge",
		name: "Subterfuge",
		description: "You may expend your special armor to resist a consequence from suspicion or persuasion, or to push yourself for subterfuge.",
		playbook: "slide"
	},
	slideTrust: {
		id: "slideTrust",
		name: "Trust in Me",
		description: "You get +1d vs. a target with whom you have an intimate relationship.",
		playbook: "slide"
	},
	x: {
		id: "",
		name: "",
		description: "",
		playbook: ""
	},
}

const XP_TRIGGERS = {
	cutter: "violence or coercion",
	hound: "tracking or violence",
	leech: "technical skill or mayhem",
	lurk: "stealth or evasion",
	slide: "deception or influence",
	spider: "calculation or conspiracy",
	whisper: "knowledge or arcane power"
}

export default App;
