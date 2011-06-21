from django.conf.urls.defaults import patterns, include, url
from ucall.rpc import Router
from django.contrib import admin

admin.autodiscover()
router = Router()

urlpatterns = patterns('',
    url(r'^profile-save/', 'ucall.views.profile_save'),
    url(r'^router/$', router, name='router'),
    url(r'^router/api/$', router.api, name='api'),
    url(r'^$', 'ucall_ui.views.main', name="root"),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', name="login"),
    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout_then_login', name="logout"),
    url(r'^admin/', include(admin.site.urls), name="admin"),
    url(r'^profile/', 'ucall.views.main', name="profile"),
    url(r'^config/stomp/', 'ucall.views.config_stomp', name="config_stomp"),
    url(r'^config/current_user/', 'ucall.views.config_current_user', name="config_current_user"),
    url(r'^config/urls/', 'ucall.views.config_urls', name="config_urls"),
    url(r'^forms/', 'form_designer.urls', name="forms"),
    url(r'^admin/form_designer/', 'form_designer.admin_urls', name="form_designer"),
)
