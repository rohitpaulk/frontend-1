with (scope('Repository', 'App')) {
  route('#repos/search', function() {
    var params = get_params();
    var target_div = div('Loading...');

    render(
      breadcrumbs(
        a({ href: '#' }, 'Home'),
        'Search: ' + params.query
      ),

      target_div
    );

    BountySource.search_repositories(params.query, function(response) {
      var repositories = response.data||[];

      render({ into: target_div },
        table(
          tr(
            th('Repository'),
            th('Bounties'),
            th('Followers'),
            th('Forks'),
            th('Updated'),
            th('Description')
          ),

          (repositories||[]).map(function(repo) {
            return tr(
              td({ style: 'width: 200px' }, a({ href: '#repos/'+repo.owner+'/'+repo.name }, repo.owner+'/'+repo.name)),
              td(money(repo.total_bounty)),
              td(number(repo.followers)),
              td(number(repo.forks)),
              td({ style: 'white-space:nowrap' }, (repo.pushed_at||"").substr(0,10)),
              td({ style: 'color: #888' }, p({ style: 'width: 250px;' }, repo.description))
            );
          })
        )
      );
    });
  });
};