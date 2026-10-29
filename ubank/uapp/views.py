from django.shortcuts import render

# Create your views here.
def welcome(request):
    return render(request, 'welcome.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def riwayat(request):
    return render(request, 'riwayat.html')

def login(request):
    return render(request, 'login.html')

def register(request):
    return render(request, 'register.html')
