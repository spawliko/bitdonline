import React, { useState, useEffect } from 'react';
import { Cookies } from "react-cookie";

import logo from './logo.svg';
import './App.css';

const cookie = new Cookies();

function TrackBox({ label, index, value, setValue }) {
	async function handleClick() {
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
		<div class="trackerBoxes">
			{boxes}
		</div>
	);
}

function LabelTracker({ label, track }) {
	let track_id = "track_"+label
	return (
		<div class="tracker">
			<div class="trackerLabel">{label}</div>
			<Track id={track_id} label={label} size={track.maxValue} value={track.value} setValue={track.setValue} />
		</div>
	);
}

function ActionDot({ index, value, setValue, edit }) {
	async function handleClick() {
		if (value === index) {
			setValue(index-1);
		} else {
			setValue(index);
		}
	}
	
	return (
		<button class={value < index ? "actionDotOpen" : "actionDotFill"} disabled={!edit} onClick={handleClick} ></button>
	);
}

function ActionRating({ action, edit }) {
	const dots = [];
	for (let i = 0; i < 4; i++) {
		dots.push(
			<>
				<td>
					<ActionDot index={i+1} value={action.value} setValue={action.setValue} edit={edit} />
				</td>
				<td>
					<div class={i === 0 ? "dotDelimiterBar": "dotDelimiterSpace"}/>
				</td>
			</>
		);
	}
	return (
		<>
			<div class="actionLabel">{action.name}</div>
			<div class="actionDots">{dots}</div>
		</>
	);
}

function AttributeBlock({ attribute, edit }) {	
	const rows = [];
	attribute.actions.forEach((action) => {
		rows.push(
			<ActionRating class="actionRow" action={action} edit={edit} />
		);
	});

	return (
		<div class="attributeBlock">
			<div><LabelTracker label={attribute.name} track={attribute.xp_track} /></div>
			<div class="actionList">{rows}</div>
		</div>
	);
}

function CharacterDetails({ characterDetails }) {
	const [edit, setEdit] = useState(false)
	
	function options(detail, edit) {
		const ops = [];
		detail.choices.forEach((op) => {
			ops.push(
				<option value={op}>{op}</option>
			)
		});
		
		return (
			<select value={detail.value} onChange={(e) => {detail.setValue(e.target.value)}} disabled={!edit}>
				{ops}
			</select>
		);
	}
	
	return (
		<fieldset>
			<legend class="sectionHeader">Details:</legend>
			<div class="detailsWrapper">
				<div class="wrapperHeader">Name:</div>
				<div>
					<div class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.name.value} placeholder="Enter Name" onChange={(e) => {characterDetails.name.setValue(e.target.value)}} /></div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.name.value}</div>
				</div>
				<div class="wrapperHeader">Alias:</div>
				<div>
					<div class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.alias.value} placeholder="Enter Alias" onChange={(e) => {characterDetails.alias.setValue(e.target.value)}} /></div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.alias.value}</div>
				</div>
			</div>
			<hr/>
			<div class="detailsWrapper">
				<div class="wrapperHeader">Look:</div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.gender, edit)}</div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.gender.value}, {characterDetails.traits.value}, {characterDetails.clothes.value}</div>
				</div>
				<div></div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.traits, edit)}</div>
				</div>
				<div></div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.clothes, edit)}</div>
				</div>
				<div></div>
				<div>
				</div>
				<div class="wrapperHeader">Heritage:</div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.heritage, edit)}</div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.heritage.value}</div>
				</div>
				<div class="wrapperHeader">Background:</div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.background, edit)}</div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.background.value}</div>
				</div>
				<div class="wrapperHeader">Vice:</div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.vice, edit)}</div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.vice.value}</div>
				</div>
				<div class="wrapperHeader">Vice Purveyor:</div>
				<div>
					<div class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.vicePurveyor.value} placeholder="Enter Vice Purveyor" onChange={(e) => {characterDetails.vicePurveyor.setValue(e.target.value)}} /></div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.vicePurveyor.value}</div>
				</div>
				<div class="wrapperHeader">Ally:</div>
				<div>
					<div class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.ally.value} placeholder="Enter Ally" onChange={(e) => {characterDetails.ally.setValue(e.target.value)}} /></div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.ally.value}</div>
				</div>
				<div class="wrapperHeader">Nemesis:</div>
				<div>
					<div class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.nemesis.value} placeholder="Enter Nemesis" onChange={(e) => {characterDetails.nemesis.setValue(e.target.value)}} /></div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.nemesis.value}</div>
				</div>
				<div class="wrapperHeader">Trauma:</div>
				<div>
					<div class={edit ? "detailChecklistShow" : "detailChecklistHide"}>
						<TraumaSelector trauma={characterDetails.trauma.value} setTrauma={characterDetails.trauma.setValue} />
					</div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.trauma.value.join(", ")}</div>
				</div>
			</div>
			<hr/>
			<div class="detailsWrapper">
				<div class="wrapperHeader">Playbook:</div>
				<div>
					<div class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.playbook, edit)}</div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.playbook.value}</div>
				</div>
				<div class="wrapperHeader">Coin</div>
				<div>
					<Track label="coin" size={characterDetails.coin.maxValue} value={characterDetails.coin.value} setValue={characterDetails.coin.setValue} />
				</div>
				<div class="wrapperHeader">Stash:</div>
				<div>
					<div class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.stash.value} placeholder="0" onChange={(e) => {characterDetails.stash.setValue(e.target.value)}} /></div>
					<div class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.stash.value}</div>
				</div>
				<br/>
				<br/>
				<div>
					<button onClick={() => setEdit(!edit)} type="button" className="btn btn-primary">
						{edit ? "Lock Character Details" : "Edit Character Details"}
					</button>
				</div>
			</div>
		</fieldset>
	);
	
/* 	return (
	  <table>
			<thead>
				<td>Character Details:</td>
				<td>
					<button onClick={() => setEdit(!edit)} type="button" className="btn btn-primary">
						{edit ? "Lock Character Details" : "Edit Character Details"}
					</button>
				</td>
			</thead>
			<tbody>
				<tr>
					<td>Name:</td>
					<td class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.name.value} placeholder="Enter Name" onChange={(e) => {characterDetails.name.setValue(e.target.value)}} /></td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.name.value}</td>
				</tr>
				<tr>
					<td>Alias:</td>
					<td class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.alias.value} placeholder="Enter Alias" onChange={(e) => {characterDetails.alias.setValue(e.target.value)}} /></td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.alias.value}</td>
				</tr>
				<tr>
					<td>Look:</td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.gender, edit)}</td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.gender.value}, {characterDetails.traits.value}, {characterDetails.clothes.value}</td>
				</tr>
				<tr>
					<td></td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.traits, edit)}</td>
				</tr>
				<tr>
					<td></td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.clothes, edit)}</td>
				</tr>
				<tr>
					<td></td>
				</tr>
				<tr>
					<td>Heritage:</td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.heritage, edit)}</td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.heritage.value}</td>
				</tr>
				<tr>
					<td>Background:</td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.background, edit)}</td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.background.value}</td>
				</tr>
				<tr>
					<td>Vice:</td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.vice, edit)}</td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.vice.value}</td>
				</tr>
				<tr>
					<td>Vice Purveyor:</td>
					<td class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.vicePurveyor.value} placeholder="Enter Vice Purveyor" onChange={(e) => {characterDetails.vicePurveyor.setValue(e.target.value)}} /></td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.vicePurveyor.value}</td>
				</tr>
				<tr>
					<td>Ally:</td>
					<td class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.ally.value} placeholder="Enter Ally" onChange={(e) => {characterDetails.ally.setValue(e.target.value)}} /></td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.ally.value}</td>
				</tr>
				<tr>
					<td>Nemesis:</td>
					<td class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.nemesis.value} placeholder="Enter Nemesis" onChange={(e) => {characterDetails.nemesis.setValue(e.target.value)}} /></td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.nemesis.value}</td>
				</tr>
				<tr>
					<td>Playbook:</td>
					<td class={edit ? "detailDropdownShow" : "detailDropdownHide"}>{options(characterDetails.playbook, edit)}</td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.playbook.value}</td>
				</tr>
				<LabelTracker label="Coin" track={characterDetails.coin} />
				<tr>
					<td>Stash:</td>
					<td class={edit ? "detailTextBoxShow" : "detailTextBoxHide"}><input type="text" disabled={!edit} readOnly={!edit} value={characterDetails.stash.value} placeholder="0" onChange={(e) => {characterDetails.stash.setValue(e.target.value)}} /></td>
					<td class={!edit ? "detailValueShow" : "detailValueHide"}>{characterDetails.stash.value}</td>
				</tr>
			</tbody>
		</table>
	); */
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

function TraumaBox({ name, trauma, setTrauma }) {
	function handleChange(e) {
		if (e.target.checked) {
			setTrauma([
				...trauma,
				name
			]);
		} else {
			setTrauma(trauma.filter(a => a !== name));
		}
	}
	
	let traumaSelected = trauma.includes(name);
	
	return (
		<div>
			<input type="checkbox" checked={traumaSelected} onChange={handleChange} />
			{name}
		</div>
	);
}

function TraumaSelector({ trauma, setTrauma }) {
	const traumaBoxes = [];
	TRAUMA_OPTIONS.forEach((op) => {
		traumaBoxes.push(
			<TraumaBox name={op} trauma={trauma} setTrauma={setTrauma} />
		);
	});
	
	return (
		<div class="traumaWrapper">
			{traumaBoxes}
		</div>
	);
}

function HarmTable({ harm }) {
	const [edit, setEdit] = useState(false)
	
	function handleChange1a (e) {
		harm.setLvl_1a(e.target.value);
	}
	
	function handleChange1b (e) {
		harm.setLvl_1b(e.target.value);
	}
	
	function handleChange2a (e) {
		harm.setLvl_2a(e.target.value);
	}
	
	function handleChange2b (e) {
		harm.setLvl_2b(e.target.value);
	}
	
	function handleChange3a (e) {
		harm.setLvl_3a(e.target.value);
	}
	
	return (
		<div class="harmTableWrapper">
			<div class="wrapperHeader">Harm</div>
			<div/>
			<div/>
			<div>
				<button onClick={() => setEdit(!edit)} type="button" className="btn btn-primary">
					{edit ? "Lock Harm" : "Edit Harm"}
				</button>
			</div>
			<div class="wrapperHeader">Lvl. 3</div>
			<div><input type="text" disabled={!edit} readOnly={!edit} value={harm.lvl_3a} placeholder="" onChange={handleChange3a} /></div>
			<div/>
			<div>Need Help</div>
			
			<div class="wrapperHeader">Lvl. 2</div>
			<div><input type="text" disabled={!edit} readOnly={!edit} value={harm.lvl_2a} placeholder="" onChange={handleChange2a} /></div>
			<div><input type="text" disabled={!edit} readOnly={!edit} value={harm.lvl_2b} placeholder="" onChange={handleChange2b} /></div>
			<div>-1d</div>
			
			<div class="wrapperHeader">Lvl. 1</div>
			<div><input type="text" disabled={!edit} readOnly={!edit} value={harm.lvl_1a} placeholder="" onChange={handleChange1a} /></div>
			<div><input type="text" disabled={!edit} readOnly={!edit} value={harm.lvl_1b} placeholder="" onChange={handleChange1b} /></div>
			<div>Less Effect</div>
		</div>
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

function HealingButton({ healing, setHealing, harm }) {
	function handleClick() {
		harm.setLvl_1a(harm.lvl_2a);
		harm.setLvl_1b(harm.lvl_2b);
		harm.setLvl_2a(harm.lvl_3a);
		harm.setLvl_2b("");
		harm.setLvl_3a("");
		setHealing(0);
	}
	
	return (
		<button disabled={healing < 4} onClick={handleClick}>
			Reduce Harm
		</button>
	);
}

function ArmorUse({ armor }) {
	const handleChange = (event) => {
		armor.setUset(event.target.checked);
	}
	
	return (
		<div>
			<input type="checkbox" id={armor.name} checked={armor.used} onChange={handleChange} />
			<label for={armor.name}>{armor.name}</label>
		</div>
	);
}

function ArmorUses({ armorUses }) {
	const rows = [];
	armorUses.forEach((armor) => {
		rows.push(
			<div>
				<ArmorUse armor={armor} />
			</div>
		);
	});
	
	return (
		<div class="armorWrapper">
			<div class="wrapperHeader">Armor:</div>
			{rows}
		</div>
	);
}

function LoadSelector({ load, setLoad }) {
	const handleChange = (event) => {
		setLoad(event.target.value);
	};
	
	return (
		<>
			<select class="loadSelector" value={load} onChange={handleChange}>
				<option value="Light">Light</option>
				<option value="Medium">Medium</option>
				<option value="Heavy">Heavy</option>
			</select>
		</>
	);
}

function LoadDisplay({ load, setLoad, playbook, inventory, setInventory }) {
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
		<div class="loadWrapper">
			<div class="wrapperHeader">Load:</div>
			<LoadSelector load={load} setLoad={setLoad} />
			<div class="loadMonitor">
				used {loadCurrent} of {loadLimits[load.toLowerCase()]}
			</div>
			<div>
				<button disabled={load < 1} onClick={() => {setInventory([])}}>
					Clear Load
				</button>
			</div>
		</div>
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
	
	if (item.cost === undefined || item.cost < 1) {
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
		<div>
			{linkedBoxes}
			{itemLabel}
		</div>
	);
}

function ItemList({ label, inventory, setInventory, itemSource  }) {
	const itemBoxes = [];	
	Object.entries(itemSource).forEach(([key, item]) => {
		itemBoxes.push(
			<ItemCheckbox item={item} inventory={inventory} setInventory={setInventory} />
		);
	});
	
	return (
		<details>
			<summary class="wrapperHeader">{label}:</summary>
			<p>
			  <div class="inventoryWrapper">
					{itemBoxes}
				</div>
			</p>
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

function AbilityList({ abilityList, setAbilityList, playbook }) {
	const [showOtherPlaybooks, setShowOtherPlaybooks] = useState(false);
	const rows = [];
	abilityList.forEach((ability) => {
		let abilityInfo = SPECIAL_ABILITIES[ability]
		rows.push(
			<div><AbilityEntry name={abilityInfo.name} description={abilityInfo.description} /></div>
		);
	});
	
	let abilitySource = Object.values(SPECIAL_ABILITIES).filter(a => showOtherPlaybooks || a.playbook.toLowerCase() === playbook.toLowerCase());
	
	return (
		<>
			<div class="wrapperHeader">Special Abilities:</div>
			{rows}
			<hr/>
			<label>
				<input type="checkbox" checked={showOtherPlaybooks} onChange={(e) => setShowOtherPlaybooks(e.target.checked)} />
				Show abilities from other playbooks
			</label>
			<ItemList label="Available Abilities" inventory={abilityList} setInventory={setAbilityList} itemSource={abilitySource} />
		</>
	);
}

function CharacterSheet({ characterInfo, characterInfoSetters }) {
	// const [name, setName] = useState("");
	// const [alias, setAlias] = useState("");
	// const [gender, setGender] = useState("");
	// const [traits, setTraits] = useState("");
	// const [clothes, setClothes] = useState("");
	// const [heritage, setHeritage] = useState("");
	// const [background, setBackground] = useState("");
	// const [vice, setVice] = useState("");
	// const [vicePurveyor, setVicePurveyor] = useState("");
	// const [ally, setAlly] = useState("");
	// const [nemesis, setNemesis] = useState("");
	// const [playbook, setPlaybook] = useState("Cutter");
	// const [coin, setCoin] = useState(0);
	// const [stash, setStash] = useState(0);
	// const [stress, setStress] = useState(0);
	// const [maxStress, setMaxStress] = useState(9);
	// const [trauma, setTrauma] = useState([]);
	// const [harm1a, setHarm1a] = useState("");
	// const [harm1b, setHarm1b] = useState("");
	// const [harm2a, setHarm2a] = useState("");
	// const [harm2b, setHarm2b] = useState("");
	// const [harm3a, setHarm3a] = useState("");
	// const [healing, setHealing] = useState(0);
	// const [armorNormal, setArmorNormal] = useState(false);
	// const [armorHeavy, setArmorHeavy] = useState(false);
	// const [armorSpecial, setArmorSpecial] = useState(false);
	// const [insightXP, setInsightXP] = useState(0);
	// const [prowessXP, setProwessXP] = useState(0);
	// const [resolveXP, setResolveXP] = useState(0);
	// const [playbookXP, setPlaybookXP] = useState(0);
	// const [hunt, setHunt] = useState(0);
	// const [study, setStudy] = useState(0);
	// const [survey, setSurvey] = useState(0);
	// const [tinker, setTinker] = useState(0);
	// const [finesse, setFinesse] = useState(0);
	// const [prowl, setProwl] = useState(0);
	// const [skirmish, setSkirmish] = useState(0);
	// const [wreck, setWreck] = useState(0);
	// const [attune, setAttune] = useState(0);
	// const [command, setCommand] = useState(0);
	// const [consort, setConsort] = useState(0);
	// const [sway, setSway] = useState(0);
	// const [load, setLoad] = useState("Light");
	// const [itemsUsed, setItemsUsed] = useState([]);
	// const [specialAbilities, setSpecialAbilities] = useState([]);
	
	const [editActions, setEditActions] = useState(false);
	
	const attributes = [
	  {
			name: "Insight",
			actions: [
				{name: "Hunt", value: characterInfo.hunt, setValue: characterInfoSetters.setHunt},
				{name: "Study", value: characterInfo.study, setValue: characterInfoSetters.setStudy},
				{name: "Survey", value: characterInfo.survey, setValue: characterInfoSetters.setSurvey},
				{name: "Tinker", value: characterInfo.tinker, setValue: characterInfoSetters.setTinker}
			],
			xp_track: {
				value: characterInfo.insightXP,
				setValue: characterInfoSetters.setInsightXP,
				maxValue: 6
			}
		},
		{
			name: "Prowess",
			actions: [
				{name: "Finesse", value: characterInfo.finesse, setValue: characterInfoSetters.setFinesse},
				{name: "Skirmish", value: characterInfo.skirmish, setValue: characterInfoSetters.setSkirmish},
				{name: "Prowl", value: characterInfo.prowl, setValue: characterInfoSetters.setProwl},
				{name: "Wreck", value: characterInfo.wreck, setValue: characterInfoSetters.setWreck}
			],
			xp_track: {
				value: characterInfo.prowessXP,
				setValue: characterInfoSetters.setProwessXP,
				maxValue: 6
			}
		},
		{
			name: "Resolve",
			actions: [
				{name: "Attune", value: characterInfo.attune, setValue: characterInfoSetters.setAttune},
				{name: "Command", value: characterInfo.command, setValue: characterInfoSetters.setCommand},
				{name: "Consort", value: characterInfo.consort, setValue: characterInfoSetters.setConsort},
				{name: "Sway", value: characterInfo.sway, setValue: characterInfoSetters.setSway}
			],
			xp_track: {
				value: characterInfo.resolveXP,
				setValue: characterInfoSetters.setResolveXP,
				maxValue: 6
			}
		}
	]
	
	// const details = {
		// name: characterInfo.name,
		// alias: characterInfo.alias,
		// look: {
			// gender: characterInfo.gender,
			// traits: characterInfo.traits,
			// clothes: characterInfo.clothes
		// },
		// heritage: characterInfo.heritage,
		// background: characterInfo.background,
		// vice: characterInfo.vice,
		// vicePurveyor: characterInfo.vicePurveyor,
		// ally: characterInfo.ally,
		// nemesis: characterInfo.nemesis,
		// playbook: characterInfo.playbook,
		// coin: {
			// value: characterInfo.coin,
			// setValue: characterInfoSetters.setCoin,
			// maxValue: 4
		// },
		// stash: characterInfo.stash
	// }
	
	const details = {
		name: {
			value: characterInfo.name,
			setValue: characterInfoSetters.setName,
		},
		alias: {
			value: characterInfo.alias,
			setValue: characterInfoSetters.setAlias,
		},
		gender: {
			value: characterInfo.gender,
			setValue: characterInfoSetters.setGender,
			choices: ["Ambiguous", "Concealed", "Man", "Woman"]
		},
		traits: {
			value: characterInfo.traits,
			setValue: characterInfoSetters.setTraits,
			choices: [
				"Affable",
				"Athletic",
				"Bony",
				"Bright",
				"Brooding",
				"Calm",
				"Chiseled",
				"Cold",
				"Dark",
				"Delicate",
				"Fair",
				"Fierce",
				"Handsome",
				"Huge",
				"Languid",
				"Lean",
				"Lovely",
				"Open",
				"Plump",
				"Rough",
				"Sad",
				"Scarred",
				"Slim",
				"Squat",
				"Stern",
				"Stout",
				"Striking", 
				"Weathered",
				"Wiry",
				"Worn",
			]
		},
		clothes: {
			value: characterInfo.clothes,
			setValue: characterInfoSetters.setClothes,
			choices: [
				"Collared Shirt",
				"Eel-skin Bodysuit",
				"Fitted Dress",
				"Fitted Leggings",
				"Heavy Cloak",
				"Hide and Furs",
				"Hood and Veil",
				"Hooded Coat",
				"Knit Cap",
				"Leathers",
				"Long Coat",
				"Long Scarf",
				"Loose Silks",
				"Mask and Robes",
				"Scavenged Uniform",
				"Sharp Trousers",
				"Skirt and Blouse",
				"Slim Jacket",
				"Soft Boots",
				"Short Cloak",
				"Suit and Vest",
				"Suspenders",
				"Tall Boots",
				"Thick Greatcoat",
				"Threadbare Tatters",
				"Tricorn Hat",
				"Waxed Coat",
				"Work Boots",
			]
		},
		heritage: {
			value: characterInfo.heritage,
			setValue: characterInfoSetters.setHeritage,
			choices: ["Akoros", "The Dagger Isles", "Iruvia", "Severos", "Skovlan", "Tycheros"]
		},
		background: {
			value: characterInfo.background,
			setValue: characterInfoSetters.setBackground,
			choices: ["Academic", "Labor", "Law", "Trade", "Military", "Noble", "Underworld"]
		},
		vice: {
			value: characterInfo.vice,
			setValue: characterInfoSetters.setVice,
			choices: ["Faith", "Gambling", "Luxury", "Obligation", "Pleasure", "Stupor", "Weird"]
		},
		vicePurveyor: {
			value: characterInfo.vicePurveyor,
			setValue: characterInfoSetters.setVicePurveyor,
		},
		ally: {
			value: characterInfo.ally,
			setValue: characterInfoSetters.setAlly,
		},
		nemesis: {
			value: characterInfo.nemesis,
			setValue: characterInfoSetters.setNemesis,
		},
		playbook: {
			value: characterInfo.playbook,
			setValue: characterInfoSetters.setPlaybook,
			choices: ["Cutter", "Hound", "Leech", "Lurk", "Slide", "Spider", "Whisper"]
		},
		coin: {
			value: characterInfo.coin,
			setValue: characterInfoSetters.setCoin,
			maxValue: 4
		},
		stash: {
			value: characterInfo.stash,
			setValue: characterInfoSetters.setStash,
		},
		trauma: {
			value: characterInfo.trauma,
			setValue: characterInfoSetters.setTrauma,
		}
	}
	
	const stressInfo = {
		value: characterInfo.stress,
		setValue: characterInfoSetters.setStress,
		maxValue: characterInfo.maxStress
	}
	
	const harm = {
		lvl_1a: characterInfo.harm1a,
		setLvl_1a: characterInfoSetters.setHarm1a,
		lvl_1b: characterInfo.harm1b,
		setLvl_1b: characterInfoSetters.setHarm1b,
		lvl_2a: characterInfo.harm2a,
		setLvl_2a: characterInfoSetters.setHarm2a,
		lvl_2b: characterInfo.harm2b,
		setLvl_2b: characterInfoSetters.setHarm2b,
		lvl_3a: characterInfo.harm3a,
		setLvl_3a: characterInfoSetters.setHarm3a
	}
	
	const armor = [
		{name: "armor", used: characterInfo.armorNormal, setUsed: characterInfoSetters.setArmorNormal},
		{name: "heavy", used: characterInfo.armorHeavy, setUsed: characterInfoSetters.setArmorHeavy},
		{name: "special", used: characterInfo.armorSpecial, setUsed: characterInfoSetters.setArmorSpecial}
	]
	
	const playbookXPInfo = {
		value: characterInfo.playbookXP,
		setValue: characterInfoSetters.setPlaybookXP,
		maxValue: 8
	}
	
	const attributeBlocks = [];
	attributes.forEach((attribute) => {
		attributeBlocks.push(
			<div>
				<AttributeBlock attribute={attribute} edit={editActions} />
			</div>
		);
	});
	
	const playbookItems = PLAYBOOK_ITEMS[characterInfo.playbook.toLowerCase()];
	
	return (
		<div class="toplevelWrapper">
			<CharacterDetails characterDetails={details} />
			<br/>
			
			<fieldset>
				<legend class="sectionHeader">Status:</legend>
				<div class="statusWrapper">
					<div>
						<LabelTracker label="Stress" track={stressInfo} />
					</div>
					<div>
					<TraumaTracker traumaList={characterInfo.trauma} />
					</div>
					<div>
					<HealingClock healing={characterInfo.healing} setHealing={characterInfoSetters.setHealing} />
					</div>
					<div>
					<HealingButton healing={characterInfo.healing} setHealing={characterInfoSetters.setHealing} harm={harm} />
					</div>
				</div>
				<hr/>
				<HarmTable harm={harm} />
				<hr/>
				<ArmorUses armorUses={armor} />
				<LoadDisplay load={characterInfo.load} setLoad={characterInfoSetters.setLoad} playbook={characterInfo.playbook} inventory={characterInfo.itemsUsed} setInventory={characterInfoSetters.setItemsUsed} />
			</fieldset>
			<br/>
			
			<fieldset>
				<legend class="sectionHeader">Attributes and Actions:</legend>
				<div class="attributeBlockWrapper">
					{attributeBlocks}
					<div>
						<LabelTracker label="Playbook" track={playbookXPInfo} />
						<button onClick={() => setEditActions(!editActions)} type="button" className="btn btn-primary">
							{editActions ? "Lock Actions" : "Edit Actions"}
						</button>
					</div>
				</div>
			</fieldset>
			<br/>
			
			<fieldset>
				<legend class="sectionHeader">Other:</legend>
				<div>
					<ItemList label="Items" inventory={characterInfo.itemsUsed} setInventory={characterInfoSetters.setItemsUsed} itemSource={GENERAL_ITEMS} />
					<br/>
					<ItemList label="Playbook Items" inventory={characterInfo.itemsUsed} setInventory={characterInfoSetters.setItemsUsed} itemSource={playbookItems} />
					<br/>
					<AbilityList abilityList={characterInfo.specialAbilities} setAbilityList={characterInfoSetters.setSpecialAbilities} playbook={characterInfo.playbook} />
					<br/>
					<XPTriggerList playbook={characterInfo.playbook} />
				</div>
			</fieldset>
			
		</div>
	);
}

function App() {
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
	const [playbookXP, setPlaybookXP] = useState(0);
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
	
	const characterInfo = {
		name: name,
		alias: alias,
		gender: gender,
		traits: traits,
		clothes: clothes,
		heritage: heritage,
		background: background,
		vice: vice,
		vicePurveyor: vicePurveyor,
		ally: ally,
		nemesis: nemesis,
		playbook: playbook,
		coin: coin,
		stash: stash,
		stress: stress,
		maxStress: maxStress,
		trauma: trauma,
		harm1a: harm1a,
		harm1b: harm1b,
		harm2a: harm2a,
		harm2b: harm2b,
		harm3a: harm3a,
		healing: healing,
		armorNormal: armorNormal,
		armorHeavy: armorHeavy,
		armorSpecial: armorSpecial,
		insightXP: insightXP,
		prowessXP: prowessXP,
		resolveXP: resolveXP,
		playbookXP: playbookXP,
		hunt: hunt,
		study: study,
		survey: survey,
		tinker: tinker,
		finesse: finesse,
		prowl: prowl,
		skirmish: skirmish,
		wreck: wreck,
		attune: attune,
		command: command,
		consort: consort,
		sway: sway,
		load: load,
		itemsUsed: itemsUsed,
		specialAbilities: specialAbilities
	}
	const characterInfoSetters = {
		setName: (x) => {setName(x); saveOneCookie("name", x)},
		setAlias: (x) => {setAlias(x); saveOneCookie("alias", x)},
		setGender: (x) => {setGender(x); saveOneCookie("gender", x)},
		setTraits: (x) => {setTraits(x); saveOneCookie("traits", x)},
		setClothes: (x) => {setClothes(x); saveOneCookie("clothes", x)},
		setHeritage: (x) => {setHeritage(x); saveOneCookie("heritage", x)},
		setBackground: (x) => {setBackground(x); saveOneCookie("background", x)},
		setVice: (x) => {setVice(x); saveOneCookie("vice", x)},
		setVicePurveyor: (x) => {setVicePurveyor(x); saveOneCookie("vicePurveyor", x)},
		setAlly: (x) => {setAlly(x); saveOneCookie("ally", x)},
		setNemesis: (x) => {setNemesis(x); saveOneCookie("nemesis", x)},
		setPlaybook: (x) => {setPlaybook(x); saveOneCookie("playbook", x)},
		setCoin: (x) => {setCoin(x); saveOneCookie("coin", x)},
		setStash: (x) => {setStash(x); saveOneCookie("stash", x)},
		setStress: (x) => {setStress(x); saveOneCookie("stress", x)},
		setMaxStress: (x) => {setMaxStress(x); saveOneCookie("maxStress", x)},
		setTrauma: (x) => {setTrauma(x); saveOneCookie("trauma", x)},
		setHarm1a: (x) => {setHarm1a(x); saveOneCookie("harm1a", x)},
		setHarm1b: (x) => {setHarm1b(x); saveOneCookie("harm1b", x)},
		setHarm2a: (x) => {setHarm2a(x); saveOneCookie("harm2a", x)},
		setHarm2b: (x) => {setHarm2b(x); saveOneCookie("harm2b", x)},
		setHarm3a: (x) => {setHarm3a(x); saveOneCookie("harm3a", x)},
		setHealing: (x) => {setHealing(x); saveOneCookie("healing", x)},
		setArmorNormal: (x) => {setArmorNormal(x); saveOneCookie("armorNormal", x)},
		setArmorHeavy: (x) => {setArmorHeavy(x); saveOneCookie("armorHeavy", x)},
		setArmorSpecial: (x) => {setArmorSpecial(x); saveOneCookie("armorSpecial", x)},
		setInsightXP: (x) => {setInsightXP(x); saveOneCookie("insightXP", x)},
		setProwessXP: (x) => {setProwessXP(x); saveOneCookie("prowessXP", x)},
		setResolveXP: (x) => {setResolveXP(x); saveOneCookie("resolveXP", x)},
		setPlaybookXP: (x) => {setPlaybookXP(x); saveOneCookie("playbookXP", x)},
		setHunt: (x) => {setHunt(x); saveOneCookie("hunt", x)},
		setStudy: (x) => {setStudy(x); saveOneCookie("study", x)},
		setSurvey: (x) => {setSurvey(x); saveOneCookie("survey", x)},
		setTinker: (x) => {setTinker(x); saveOneCookie("tinker", x)},
		setFinesse: (x) => {setFinesse(x); saveOneCookie("finesse", x)},
		setProwl: (x) => {setProwl(x); saveOneCookie("prowl", x)},
		setSkirmish: (x) => {setSkirmish(x); saveOneCookie("skirmish", x)},
		setWreck: (x) => {setWreck(x); saveOneCookie("wreck", x)},
		setAttune: (x) => {setAttune(x); saveOneCookie("attune", x)},
		setCommand: (x) => {setCommand(x); saveOneCookie("command", x)},
		setConsort: (x) => {setConsort(x); saveOneCookie("consort", x)},
		setSway: (x) => {setSway(x); saveOneCookie("sway", x)},
		setLoad: (x) => {setLoad(x); saveOneCookie("load", x)},
		setItemsUsed: (x) => {setItemsUsed(x); saveOneCookie("itemsUsed", x)},
		setSpecialAbilities: (x) => {setSpecialAbilities(x); saveOneCookie("specialAbilities", x)}
	}
		
	function loadCookie() {
		setName(loadOneCookie("name", ""));
		setAlias(loadOneCookie("alias", ""));
		setGender(loadOneCookie("gender", ""));
		setTraits(loadOneCookie("traits", ""));
		setClothes(loadOneCookie("clothes", ""));
		setHeritage(loadOneCookie("heritage", ""));
		setBackground(loadOneCookie("background", ""));
		setVice(loadOneCookie("vice", ""));
		setVicePurveyor(loadOneCookie("vicePurveyor", ""));
		setAlly(loadOneCookie("ally", ""));
		setNemesis(loadOneCookie("nemesis", ""));
		setPlaybook(loadOneCookie("playbook", "Cutter"));
		setCoin(loadOneCookie("coin", 0));
		setStash(loadOneCookie("stash", 0));
		setStress(loadOneCookie("stress", 0));
		setMaxStress(loadOneCookie("maxStress", 9));
		setTrauma(loadOneCookie("trauma", []));
		setHarm1a(loadOneCookie("harm1a", ""));
		setHarm1b(loadOneCookie("harm1b", ""));
		setHarm2a(loadOneCookie("harm2a", ""));
		setHarm2b(loadOneCookie("harm2b", ""));
		setHarm3a(loadOneCookie("harm3a", ""));
		setHealing(loadOneCookie("healing", 0));
		setArmorNormal(loadOneCookie("armorNormal", false));
		setArmorHeavy(loadOneCookie("armorHeavy", false));
		setArmorSpecial(loadOneCookie("armorSpecial", false));
		setInsightXP(loadOneCookie("insightXP", 0));
		setProwessXP(loadOneCookie("prowessXP", 0));
		setResolveXP(loadOneCookie("resolveXP", 0));
		setPlaybookXP(loadOneCookie("playbookXP", 0));
		setHunt(loadOneCookie("hunt", 0));
		setStudy(loadOneCookie("study", 0));
		setSurvey(loadOneCookie("survey", 0));
		setTinker(loadOneCookie("tinker", 0));
		setFinesse(loadOneCookie("finesse", 0));
		setProwl(loadOneCookie("prowl", 0));
		setSkirmish(loadOneCookie("skirmish", 0));
		setWreck(loadOneCookie("wreck", 0));
		setAttune(loadOneCookie("attune", 0));
		setCommand(loadOneCookie("command", 0));
		setConsort(loadOneCookie("consort", 0));
		setSway(loadOneCookie("sway", 0));
		setLoad(loadOneCookie("load", "Light"));
		setItemsUsed(loadOneCookie("itemsUsed", []));
		setSpecialAbilities(loadOneCookie("specialAbilities", []));
	}
	
	function loadOneCookie(label, _default) {
		let value = cookie.get(label);
		if (value === undefined) {
			value = _default
		}
		return value;
	}
	
	function saveOneCookie(label, value) {
		cookie.set(label, value, { path: "/" });
	}
	
	function saveCookie() {
		saveOneCookie("name", name);
		saveOneCookie("alias", alias);
		saveOneCookie("gender", gender);
		saveOneCookie("traits", traits);
		saveOneCookie("clothes", clothes);
		saveOneCookie("heritage", heritage);
		saveOneCookie("background", background);
		saveOneCookie("vice", vice);
		saveOneCookie("vicePurveyor", vicePurveyor);
		saveOneCookie("ally", ally);
		saveOneCookie("nemesis", nemesis);
		saveOneCookie("playbook", playbook);
		saveOneCookie("coin", coin);
		saveOneCookie("stash", stash);
		saveOneCookie("stress", stress);
		saveOneCookie("maStress", maxStress);
		saveOneCookie("trauma", trauma);
		saveOneCookie("harm1a", harm1a);
		saveOneCookie("harm1b", harm1b);
		saveOneCookie("harm2a", harm2a);
		saveOneCookie("harm2b", harm2b);
		saveOneCookie("harm3a", harm3a);
		saveOneCookie("healing", healing);
		saveOneCookie("armorNormal", armorNormal);
		saveOneCookie("armorHeavy", armorHeavy);
		saveOneCookie("armorSpecial", armorSpecial);
		saveOneCookie("insightXP", insightXP);
		saveOneCookie("prowessXP", prowessXP);
		saveOneCookie("resolveXP", resolveXP);
		saveOneCookie("playbookXP", playbookXP);
		saveOneCookie("hunt", hunt);
		saveOneCookie("study", study);
		saveOneCookie("survey", survey);
		saveOneCookie("tinker", tinker);
		saveOneCookie("finesse", finesse);
		saveOneCookie("prowl", prowl);
		saveOneCookie("skirmish", skirmish);
		saveOneCookie("wreck", wreck);
		saveOneCookie("attune", attune);
		saveOneCookie("command", command);
		saveOneCookie("consort", consort);
		saveOneCookie("sway", sway);
		saveOneCookie("load", load);
		saveOneCookie("itemsUsed", itemsUsed);
		saveOneCookie("specialAbilities", specialAbilities);
	}
	
	useEffect(() => {loadCookie()}, []);
	
	let exportName = "bitdonline_"+name+".json"
	
	const [importName, setImportName] = useState()
	
	return (
	  <>
			<CharacterSheet characterInfo={characterInfo} characterInfoSetters={characterInfoSetters} />
			<br/>
			<button onClick={saveCookie}>Save Character</button>
			<br/>
			<a
				href={`data:text/json;charset=utf-8,${encodeURIComponent(
					JSON.stringify(characterInfo)
				)}`}
				download={exportName}
			>
				{`Export Character`}
			</a>
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
	"Battleborn": {
		name: "Battleborn",
		description: "You may extend your special armor to reduce harm from an attack in combat or to push yourself during a fight.",
		playbook: "cutter"
	},
	"Bodyguard": {
		name: "Bodyguard",
		description: "When you protect a teammate, take +1d to your resistance roll. When you gather info to anticipate possible threats in the current situation, you get +1 effect.",
		playbook: "cutter"
	},
	"Ghost Fighter": {
		name: "Ghost Fighter",
		description: "You may imbue your hands, melee weapons, or tools with spirit energy. You gain potency in combat vs. the supernatural. You may grapple with spirits to restrain and capture them.",
		playbook: "cutter"
	},
	"Leader": {
		name: "Leader",
		description: "When you Command a cohort in combat, they continue to fight when they would otherwise break (they're not taken out when they suffer level 3 harm). They gain +1 effect and 1 armor.",
		playbook: "cutter"
	},
	"Mule": {
		name: "Mule",
		description: "Your load limits are higher. Light 5. Normal 7. Heavy 8.",
		playbook: "cutter"
	},
	"Not to be Trifled With": {
		name: "Not to be Trifled With",
		description: "You can push yourself to do one of the following: perform a feat of physical force that verges on the superhuman - engage a small gang on equal footing in close combat.",
		playbook: "cutter"
	},
	"Savage": {
		name: "Savage",
		description: "When you unleash physical violence, it's especially frightening. When you Command a frightened target, take +1d.",
		playbook: "cutter"
	},
	"Vigorous": {
		name: "Vigorous",
		description: "You recover from harm faster. Permanently fill in one of your healing clock segments. Take +1d to healing treatment rolls.",
		playbook: "cutter"
	},
	"Sharpshooter": {
		name: "Sharpshooter",
		description: "You can push yourself to do one of the following: make a ranged attack at extreme distance beyond what's normal for the weapon - unleash a barrage of rapid fire to suppress the enemy.",
		playbook: "hound"
	},
	"Focused": {
		name: "Focused",
		description: "You may expend your special armor to resist a consequence of surprise or mental harm (fear, confusion, losing track of someone) or to push yourself for ranged combat or tracking.",
		playbook: "hound"
	},
	"Ghost Hunter": {
		name: "Ghost Hunter",
		description: "Your hunting pet is imbued with spirit energy. It gains potency when tracking or fighting the supernatural, and gains an arcane ability: ghost-form, mind-link, or arrow-swift. Take this ability again to choose an additional arcane ability for your pet.",
		playbook: "hound"
	},
	"Scout": {
		name: "Scout",
		description: "When you gather info to locate a target, you get +1 effect. When you hide in a prepared position or use camouflage, you get +1d to rolls to avoid detection.",
		playbook: "hound"
	},
	"Survivor": {
		name: "Survivor",
		description: "From hard won experience or occult ritual, you are immune to the poisonous miasma of the deathlands and are able to subsist on the strange flora and fauna there. you get +1 stress box.",
		playbook: "hound"
	},
	"Tough as Nails": {
		name: "Tough as Nails",
		description: "Penalties from harm are one level less severe (though level 4 harm is still fatal).",
		playbook: "hound"
	},
	"Vengeful": {
		name: "Vengeful",
		description: "You gain an additional xp trigger: You got payback against someone who harmed you or someone you care about. If your crew helped you get payback, also mark crew xp.",
		playbook: "hound"
	},
	"Alchemist": {
		name: "Alchemist",
		description: "When you invent or craft a creation with alchemical features, take +1 result level to your roll. You begin with one special formula already known.",
		playbook: "leech"
	},
	"Analyst": {
		name: "Analyst",
		description: "During downtime, you get two ticks to distribute among any long term project clocks that involve investigation or learning a new formula or design plan.",
		playbook: "leech"
	},
	"Artificer": {
		name: "Artificer",
		description: "When you invent or craft a creation with spark-craft features, take +1 result level to your roll. You begin with one special design already known.",
		playbook: "leech"
	},
	"Fortitude": {
		name: "Fortitude",
		description: "You may expend your special armor to resist a consequence of fatigue, weakness, or chemical effects, or to push yourself when working with technical skill or handling alchemicals.",
		playbook: "leech"
	},
	"Ghost Ward": {
		name: "Ghost Ward",
		description: "You know how to Wreck an area with arcane substances and methods so that it is either anathema or enticing to spirits (your choice).",
		playbook: "leech"
	},
	"Physicker": {
		name: "Physicker",
		description: "You can Tinker with bones, blood, and bodily humours to treat wounds or stabilize the dying. You may study a malady or corpse. Everyone in your crew gets +1d to their healing treatment rolls.",
		playbook: "leech"
	},
	"Saboteur": {
		name: "Saboteur",
		description: "When you Wreck, the work is much quieter than it should be and the damage is hidden from casual inspection.",
		playbook: "leech"
	},
	"Venomous": {
		name: "Venomous",
		description: "Choose a drug or poison (from your bandolier stock) to which you have become immune. You can push yourself to secrete it through your skin or saliva or exhale it as a vapor.",
		playbook: "leech"
	},
	"Infiltrator": {
		name: "Infiltrator",
		description: "You are not affected by quality or Tier when you bypass security measures.",
		playbook: "lurk"
	},
	"Ambush": {
		name: "Ambush",
		description: "When you attack from hiding or spring a trap, you get +1d.",
		playbook: "lurk"
	},
	"Daredevil": {
		name: "Daredevil",
		description: "When you roll a desperate action, you get +1d to your roll if you also take -1d to any resistance rolls against consequences from your action.",
		playbook: "lurk"
	},
	"The Devil's Footsteps": {
		name: "The Devil's Footsteps",
		description: "When you push yourself, choose one of the following benefits: perform a feat of athletics that verges on the superhuman - manuever to confuse your enemies so they mistakenly attack each other.",
		playbook: "lurk"
	},
	"Expertise": {
		name: "Expertise",
		description: "Choose one of your action ratings. When you lead a group action using that action, you can suffer only 1 stress at most regardless of the number of failed rolls.",
		playbook: "lurk"
	},
	"Ghost Veil": {
		name: "Ghost Veil",
		description: "You may shift partially into the ghost field, becoming shadowy and insubstantial for a few moments. Take 2 stress when you shift, plus 1 stress for each extra feature: It lasts for a few minutes rather than moments - you are invisible rather than shadowy - you may float through the air like a ghost.",
		playbook: "lurk"
	},
	"Reflexes": {
		name: "Reflexes",
		description: "When there's a question about who acts first, the answer is you (two characters with Reflexes act simultaneously).",
		playbook: "lurk"
	},
	"Shadow": {
		name: "Shadow",
		description: "You may expend your special armor to resist a consequence from detection or security measures, or to push yourself for a feat of athletics or stealth.",
		playbook: "lurk"
	},
	"Rook's Gambit": {
		id: "slideRook",
		name: "Rook's Gambit",
		description: "Take 2 stress to roll your best action rating while performing a different action. Say how you adapt your skill to this use.",
		playbook: "slide"
	},
	"Cloak and Dagger": {
		id: "slideCloak",
		name: "Cloak and Dagger",
		description: "When you use a disguise or other form of covert misdirection, you get +1d to rolls to confuse or deflect suspicion. When you throw off your disguise, the resulting surprise gives you the initiative in the situation.",
		playbook: "slide"
	},
	"Ghost Voice": {
		id: "slideGhost",
		name: "Ghost Voice",
		description: "You know the secret method to interact with a ghost or demon as if it were a normal human, regardless of how wild or feral it appears. You gain potency when communicating with the supernatural.",
		playbook: "slide"
	},
	"Like Looking in the Mirror": {
		id: "slideMirror",
		name: "Like Looking in the Mirror",
		description: "You can always tell when someone is lying to you.",
		playbook: "slide"
	},
	"A Little Something on the Side": {
		id: "slideSide",
		name: "A Little Something on the Side",
		description: "At the end of each downtime phase, you earn +2 stash.",
		playbook: "slide"
	},
	"Mesmerism": {
		id: "slideMesmerism",
		name: "Mesmerism",
		description: "When you Sway someone, you may cause them to forget that it's happened until they next interact with you.",
		playbook: "slide"
	},
	"Subterfuge": {
		id: "slideSubterfuge",
		name: "Subterfuge",
		description: "You may expend your special armor to resist a consequence from suspicion or persuasion, or to push yourself for subterfuge.",
		playbook: "slide"
	},
	"slideTrust": {
		id: "slideTrust",
		name: "Trust in Me",
		description: "You get +1d vs. a target with whom you have an intimate relationship.",
		playbook: "slide"
	},
	"Foresight": {
		
		name: "Foresight",
		description: "Two times per score you can assist a teammate without paying stress. Tell us how you prepared for this.",
		playbook: "spider"
	},
	"Calculating": {
		name: "Calculating",
		description: "Due to your careful planning, during downtime, you may give yourself or another crew member +1 downtime action.",
		playbook: "spider"
	},
	"Connected": {
		name: "Connected",
		description: "During downtime, you get +1 result level when you acquire an asset or reduce heat.",
		playbook: "spider"
	},
	"Functioning Vice": {
		name: "Functioning Vice",
		description: "When you indulge your vice, you may adjust the dice outcome by 1 or 2 (up or down). An ally who joins in your vice may do the same.",
		playbook: "spider"
	},
	"Ghost Contract": {
		name: "Ghost Contract",
		description: "When you shake on a deal, you and your partner - human or otherwise - both bear a mark of your oath. If either breaks the contrack, they take level 3 harm, 'Cursed'.",
		playbook: "spider"
	},
	"Jail Bird": {
		name: "Jail Bird",
		description: "When incarcerated, your wanted level counts as 1 less, your Tier as 1 more, and you gain +1 faction status with a faction you help on the inside (in addition to your incarceration roll).",
		playbook: "spider"
	},
	"Mastermind": {
		name: "Mastermind",
		description: "You may expend your special armor to protect a teammate, or to push yourself when you gather information or work on a long-term project.",
		playbook: "spider"
	},
	"Weaving the Web": {
		name: "Weaving the Web",
		description: "You gain +1d to Consort when you gather information on a target for a score. You get +1d to the engagement roll for that operation.",
		playbook: "spider"
	},
	"Compel": {
		name: "Compel",
		description: "You can Attune to the ghost field to force a nearby ghost to appear and obey a command you give it. You are not supernaturally terrified by a ghost you summon or compel (though your allies may be).",
		playbook: "whisper"
	},
	"Ghost Mind": {
		name: "Ghost Mind",
		description: "You're always aware of supernatural entities in your presence. Take +1d then you gather info about the supernatural.",
		playbook: "whisper"
	},
	"Iron Will": {
		name: "Iron Will",
		description: "You're immune to the terror that some supernatural entities inflict on sight. Take +1d to resistance rolls with Resolve.",
		playbook: "whisper"
	},
	"Occultist": {
		name: "Occultist",
		description: "You know the secret ways to Consort with ancient powers, forgotten gods, or demons. Once you've consorted with one, you get +1 to command cultists who worship it.",
		playbook: "whisper"
	},
	"Ritual": {
		name: "Ritual",
		description: "You can Study an occult ritual (or create a new one) to summon a supernatural effect or being. You know the arcane methods to perform ritual sorcery. You begin with one ritual already learned.",
		playbook: "whisper"
	},
	"Strange Methods": {
		name: "Strange Methods",
		description: "When you invent or craft a creation with arcane features, take +1 result level to your roll. You begin with one arcane design already known.",
		playbook: "whisper"
	},
	"Tempest": {
		name: "Tempest",
		description: "You can push yourself to do one of the following: unleash a stroke of lightning as a weapon - summon a storm in your immediate vicinity (torrential rain, roaring winds, heavy fog, chilling frost/snow, etc.).",
		playbook: "whisper"
	},
	"Warded": {
		name: "Warded",
		description: "You may expend your special armor to resist a supernatural consequence, or to push yourself when you deal with arcane forces.",
		playbook: "whisper"
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

const TRAUMA_OPTIONS = ["Cold", "Haunted", "Obsessed", "Paranoid", "Reckless", "Soft", "Unstable", "Vicious"]

export default App;
