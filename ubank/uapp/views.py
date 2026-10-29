from django.shortcuts import render

# Create your views here.
def dashboard(request):
    return render(request, 'dashboard.html')

def riwayat(request):
    return render(request, 'riwayat.html')