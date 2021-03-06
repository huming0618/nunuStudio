"use strict";

function RenderSettingsTab(parent, closeable, container, index)
{
	TabElement.call(this, parent, closeable, container, index, "Render", Editor.filePath + "icons/misc/particles.png");

	this.element.style.overflow = "auto";

	var self = this;

	this.form = new TableForm(this);
	this.form.setAutoSize(false);
	this.form.defaultTextWidth = 125;

	//Renderer settings
	this.form.addText("Renderer Quality");
	this.form.nextRow();

	//Use project settings
	this.form.addText("Follow project").setAltText("If checked the project rendering settings will be used, its better to preview the final result.");
	this.followProject = new CheckBox(this.form);
	this.followProject.size.set(18, 18);
	this.followProject.setOnChange(function()
	{
		Editor.settings.render.followProject = self.followProject.getValue();
	});
	this.form.add(this.followProject);
	this.form.nextRow();

	//Space
	this.form.addText("");
	this.form.nextRow();

	//Editor rendering quality
	this.form.addText("Editor Rendering Quality");
	this.form.nextRow();

	//Antialiasing
	this.form.addText("Antialiasing").setAltText("Antialiasing can be used to smooth jaged edges.");
	this.antialiasing = new CheckBox(this.form);
	this.antialiasing.size.set(18, 18);
	this.antialiasing.setOnChange(function()
	{
		Editor.settings.render.antialiasing = self.antialiasing.getValue();
	});
	this.form.add(this.antialiasing);
	this.form.nextRow();

	//Shadows
	this.form.addText(Locale.shadows);
	this.shadows = new CheckBox(this.form);
	this.shadows.size.set(18, 18);
	this.shadows.setOnChange(function()
	{	
		Editor.settings.render.shadows = self.shadows.getValue();
	});
	this.form.add(this.shadows);
	this.form.nextRow();

	//Shadows settings
	this.form.addText("Shadows type");
	this.shadowsType = new DropdownList(this.form);
	this.shadowsType.size.set(150, 18);
	this.shadowsType.addValue("Basic", THREE.BasicShadowMap);
	this.shadowsType.addValue("PCF", THREE.PCFShadowMap);
	this.shadowsType.addValue("PCF Soft", THREE.PCFSoftShadowMap);
	this.shadowsType.setOnChange(function()
	{
		Editor.settings.render.shadowsType = self.shadowsType.getValue();
	});
	this.form.add(this.shadowsType);
	this.form.nextRow();

	//Tonemapping
	this.form.addText("Tonemapping");
	this.toneMapping = new DropdownList(this.form);
	this.toneMapping.size.set(150, 18);
	this.toneMapping.addValue("None", THREE.NoToneMapping);
	this.toneMapping.addValue("Linear", THREE.LinearToneMapping);
	this.toneMapping.addValue("Reinhard", THREE.ReinhardToneMapping);
	this.toneMapping.addValue("Uncharted", THREE.Uncharted2ToneMapping);
	this.toneMapping.addValue("Cineon", THREE.CineonToneMapping);
	this.toneMapping.addValue("ACES Filmic", THREE.ACESFilmicToneMapping);
	this.toneMapping.setOnChange(function()
	{
		Editor.settings.render.toneMapping = self.toneMapping.getValue();
	});
	this.form.add(this.toneMapping);
	this.form.nextRow();

	//Tonemapping exposure
	this.form.addText("Exposure");
	this.toneMappingExposure = new NumberBox(this.form);
	this.toneMappingExposure.size.set(60, 18);
	this.toneMappingExposure.setRange(0.0, Number.MAX_SAFE_INTEGER);
	this.toneMappingExposure.setStep(0.1);
	this.toneMappingExposure.setOnChange(function()
	{
		Editor.settings.render.toneMappingExposure = self.toneMappingExposure.getValue();
	});
	this.form.add(this.toneMappingExposure);
	this.form.nextRow();

	//Tonemapping whitepoint
	this.form.addText("Whitepoint");
	this.toneMappingWhitePoint = new NumberBox(this.form);
	this.toneMappingWhitePoint.size.set(60, 18);
	this.toneMappingWhitePoint.setRange(0.0, Number.MAX_SAFE_INTEGER);
	this.toneMappingWhitePoint.setStep(0.1);
	this.toneMappingWhitePoint.setOnChange(function()
	{
		Editor.settings.render.toneMappingWhitePoint = self.toneMappingWhitePoint.getValue();
	});
	this.form.add(this.toneMappingWhitePoint);
	this.form.nextRow();
}

RenderSettingsTab.prototype = Object.create(TabElement.prototype);

RenderSettingsTab.prototype.activate = function()
{
	this.followProject.setValue(Editor.settings.render.followProject);
	this.antialiasing.setValue(Editor.settings.render.antialiasing);
	this.shadows.setValue(Editor.settings.render.shadows);
	this.shadowsType.setValue(Editor.settings.render.shadowsType);
	this.toneMapping.setValue(Editor.settings.render.toneMapping);
	this.toneMappingExposure.setValue(Editor.settings.render.toneMappingExposure);
	this.toneMappingWhitePoint.setValue(Editor.settings.render.toneMappingWhitePoint);
};

RenderSettingsTab.prototype.updateSize = function()
{
	TabElement.prototype.updateSize.call(this);
	
	this.form.size.copy(this.size);
	this.form.updateInterface();
};
