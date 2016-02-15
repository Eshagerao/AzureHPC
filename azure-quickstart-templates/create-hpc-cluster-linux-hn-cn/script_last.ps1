param([string]$rg = "rg-004", [string]$cnn = "2")
$vmTemplate="C:\Users\Juanjo\Dropbox\SolidQ\1_TFM\Template\Last\azuredeployLast.json"

New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -computeNodeNumber $cnn