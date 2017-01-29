"use strict";

function DirectionalLightPanel(parent, obj)
{
	Panel.call(this, parent, obj);

	//Self pointer
	var self = this;

	//Color
	this.form.addText("Color");
	this.color = new ColorChooser(this.form.element);
	this.color.size.set(80, 18);
	this.color.setOnChange(function()
	{
		if(self.obj !== null)
		{
			var color = self.color.getValue();
			self.obj.color.setRGB(color.r, color.g, color.b);
		}
	});
	this.form.add(this.color);
	this.form.nextRow();

	//Visible
	this.visible = new CheckBox(this.form.element);
	this.form.addText("Visible");
	this.visible.size.set(200, 15);
	this.visible.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.visible = self.visible.getValue();
		}
	});
	this.form.add(this.visible);
	this.form.nextRow();

	//Static
	this.static = new CheckBox(this.form.element);
	this.form.addText("Static Object");
	this.static.size.set(200, 15);
	this.static.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.matrixAutoUpdate = !(self.static.getValue());
		}
	});
	this.form.add(this.static);
	this.form.nextRow();

	//Shadow map
	this.form.addText("Shadows");
	this.form.nextRow();

	//Cast shadow
	this.cast_shadow = new CheckBox(this.form.element);
	this.form.addText("Cast Shadows");
	this.cast_shadow.size.set(200, 15);
	this.cast_shadow.position.set(5, 85);
	this.cast_shadow.updateInterface();
	this.cast_shadow.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.castShadow = self.cast_shadow.getValue();
		}
	});
	this.form.add(this.cast_shadow);
	this.form.nextRow();

	//Shadow resolution
	this.form.addText("Resolution");
	this.shadow_width = new DropdownList(this.form.element);
	this.shadow_width.size.set(60, 18);
	this.shadow_width.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.mapSize.width = self.shadow_width.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_width);
	this.form.addText("x");
	this.shadow_height = new DropdownList(this.form.element);
	this.shadow_height.size.set(60, 18);
	this.shadow_height.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.mapSize.height = self.shadow_height.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_height);
	this.form.nextRow();
	for(var i = 5; i < 13; i++)
	{
		var size = Math.pow(2, i);
		this.shadow_width.addValue(size.toString(), size);
		this.shadow_height.addValue(size.toString(), size);
	}

	//Shadowmap camera near
	this.form.addText("Near");
	this.shadow_near = new NumberBox(this.form.element);
	this.shadow_near.size.set(60, 18);
	this.shadow_near.setStep(0.1);
	this.shadow_near.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.near = self.shadow_near.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_near);

	//Shadowmap camera far
	this.form.addText("Far");
	this.shadow_far = new NumberBox(this.form.element);
	this.shadow_far.size.set(60, 18);
	this.shadow_far.setStep(0.1);
	this.shadow_far.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.far = self.shadow_far.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_far);
	this.form.nextRow();

	//Shadowmap camera left
	this.form.addText("Left");
	this.shadow_left = new NumberBox(this.form.element);
	this.shadow_left.size.set(60, 18);
	this.shadow_left.setStep(0.1);
	this.shadow_left.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.left = self.shadow_left.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_left);

	//Shadowmap camera right
	this.form.addText("Right");
	this.shadow_right = new NumberBox(this.form.element);
	this.shadow_right.size.set(60, 18);
	this.shadow_right.setStep(0.1);
	this.shadow_right.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.right = self.shadow_right.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_right);
	this.form.nextRow();

	//Shadowmap camera top
	this.form.addText("Top");
	this.shadow_top = new NumberBox(this.form.element);
	this.shadow_top.size.set(60, 18);
	this.shadow_top.setStep(0.1);
	this.shadow_top.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.top = self.shadow_top.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_top);

	//Shadowmap camera bottom
	this.form.addText("Bottom");
	this.shadow_bottom = new NumberBox(this.form.element);
	this.shadow_bottom.size.set(60, 18);
	this.shadow_bottom.setStep(0.1);
	this.shadow_bottom.setOnChange(function()
	{
		if(self.obj !== null)
		{
			self.obj.shadow.camera.bottom = self.shadow_bottom.getValue();
			self.obj.updateShadowMap();
		}
	});
	this.form.add(this.shadow_bottom);
	this.form.nextRow();

	//Update form
	this.form.updateInterface();
}

//Super prototypes
DirectionalLightPanel.prototype = Object.create(Panel.prototype);

//Update panel content from attached object
DirectionalLightPanel.prototype.updatePanel = function()
{
	Panel.prototype.updatePanel.call(this);
	
	if(this.obj !== null)
	{
		this.color.setValue(this.obj.color.r, this.obj.color.g, this.obj.color.b);
		this.visible.setValue(this.obj.visible);
		this.static.setValue(!this.obj.matrixAutoUpdate);
		
		this.cast_shadow.setValue(this.obj.castShadow);
		this.shadow_width.setValue(this.obj.shadow.mapSize.width);
		this.shadow_height.setValue(this.obj.shadow.mapSize.height);
		this.shadow_near.setValue(this.obj.shadow.camera.near);
		this.shadow_far.setValue(this.obj.shadow.camera.far);
		this.shadow_left.setValue(this.obj.shadow.camera.left);
		this.shadow_right.setValue(this.obj.shadow.camera.right);
		this.shadow_top.setValue(this.obj.shadow.camera.top);
		this.shadow_bottom.setValue(this.obj.shadow.camera.bottom);
	}
}
