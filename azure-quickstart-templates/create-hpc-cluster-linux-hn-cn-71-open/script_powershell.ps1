param([string]$rg = "rg-001", [string]$cnn = "2")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-open/azuredeploy.json"
cd "C:/Users/Juanjo/Dropbox/SolidQ/1_TFM/Template/github/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-71-open"
Login-AzureRmAccount
.\script_powershell.ps1 -rg rg-001 -name hpcc -cnn 2
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -computeNodeNumber $cnn