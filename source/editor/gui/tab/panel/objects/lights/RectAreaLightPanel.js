"use strict";

function RectAreaLightPanel(parent, object)
{
	ObjectPanel.call(this, parent, object);

	var self = this;

	//Color
	this.form.addText("Color");
	this.color = new ColorChooser(this.form);
	this.color.size.set(80, 18);
	this.color.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.object, "color", new THREE.Color(self.color.getValueHex())));
	});
	this.form.add(this.color);
	this.form.nextRow();

	//Intensity
	this.form.addText("Intensity");
	this.intensity = new Slider(this.form);
	this.intensity.size.set(160, 18);
	this.intensity.setStep(0.1);
	this.intensity.setRange(0, 500);
	this.intensity.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.object, "intensity", self.intensity.getValue()));
	});
	this.form.add(this.intensity);
	this.form.nextRow();

	//Rect width
	this.form.addText("Width");
	this.width = new NumberBox(this.form);
	this.width.size.set(60, 18);
	this.width.setStep(0.1);
	this.width.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.object, "width", self.width.getValue()));
	});
	this.form.add(this.width);
	this.form.nextRow();
	
	//Rect height
	this.form.addText("Height");
	this.height = new NumberBox(this.form);
	this.height.size.set(60, 18);
	this.height.setStep(0.1);
	this.height.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.object, "height", self.height.getValue()));
	});
	this.form.add(this.height);
	this.form.nextRow();
}

RectAreaLightPanel.prototype = Object.create(ObjectPanel.prototype);

RectAreaLightPanel.prototype.updatePanel = function()
{
	ObjectPanel.prototype.updatePanel.call(this);
	
	this.color.setValue(this.object.color.r, this.object.color.g, this.object.color.b);
	this.intensity.setValue(this.object.intensity);
	this.width.setValue(this.object.width);
	this.height.setValue(this.object.height);
};
